// For routing.
const express = require('express');
const router = express.Router();
const { binarySearch } = require('../utils/arrayUtils.js');
const { read, write, checkExistsWithTimeout } = require('../utils/fileUtils.js');
const axios = require('axios');

router.get('/writeEntireThesisList', async (req, res) => {
    await checkExistsWithTimeout('../Student.json', 5000);
    await checkExistsWithTimeout('../MET.json', 5000);
    const studentThesisList = read('../Student.json');
    const metThesisList = read('../MET.json');
    const finalList = [];
    var counter = 0;

    metThesisList.sort(function (a, b) {
        if (b.thesisName > a.thesisName) {
            return -1;
        }
        if (a.thesisName > b.thesisName) {
            return 1;
        }
        return 0;
    });

    for (var i = 0; i < studentThesisList.length; i++) {
        const studentThesis = { id: counter, thesisName: studentThesisList[i].thesisName, supervisorInStudent: studentThesisList[i].thesisSupervisor };
        const result = binarySearch(metThesisList, studentThesisList[i].thesisName.toString().split(/\s[-–]\s/)[0]);

        if (result === -1) {
            studentThesis.foundInMET = false;
        }
        else {
            studentThesis.foundInMET = true;
            studentThesis.category = metThesisList[result].category;
            studentThesis.categoryDescription = metThesisList[result].categoryDescription;
            studentThesis.thesisDescription = metThesisList[result].thesisDescription;
            studentThesis.supervisorsInMET = metThesisList[result].supervisors;
            studentThesis.assistantSupervisorsInMET = metThesisList[result].assistantSupervisors;
        }
        finalList.push(studentThesis);
        counter++;
    }

    write('./entireThesisList.json', finalList);
    return res.status(200).send('Operation Successful!');

})

router.get('/writeUnfoundThesisList', async (req, res) => {
    checkExistsWithTimeout('../entireThesisList.json', 500)
    .then(() => {
        const entireList = read('../entireThesisList.json');
        const unfoundList = entireList.filter((thesis) => {return !thesis.foundInMET});
        write('./unfoundThesisList.json', unfoundList);
        return res.status(200).send('Operation Successful!');
    }
    )
    .catch(async (error) => {
        await axios.get('http://localhost:5000/api/writeEntireThesisList');
        const entireList = read('../entireThesisList.json');
        const unfoundList = entireList.filter((thesis) => {return !thesis.foundInMET});
        write('./unfoundThesisList.json', unfoundList);
        return res.status(200).send('Operation Successful!');
    });
});

router.get('/readEntireThesisList', async (req, res) => {
    checkExistsWithTimeout('../entireThesisList.json', 500)
        .then(() => {
            const entireList = read('../entireThesisList.json');
            return res.status(200).json(entireList);
        }
        )
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/writeEntireThesisList');
            const entireList = read('../entireThesisList.json');
            return res.status(200).json(entireList);
        });
});

router.get('/readUnfoundThesisList', async (req, res) => {
    checkExistsWithTimeout('../unfoundThesisList.json', 500)
        .then(() => {
            const unfoundList = read('../unfoundThesisList.json');
            return res.status(200).json(unfoundList);
        }
        )
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/writeUnfoundThesisList');
            const unfoundList = read('../unfoundThesisList.json');
            return res.status(200).json(unfoundList);
        })
});

module.exports = router;

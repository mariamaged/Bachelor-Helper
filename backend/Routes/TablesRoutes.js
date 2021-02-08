// For routing.
const express = require('express');
const router = express.Router();
const { binarySearch } = require('../utils/arrayUtils.js');
const { read, write } = require('../utils/fileUtils.js');

router.get('/entireThesisList', async (req, res) => {
    const studentThesisList = read('../Student.json');
    const metThesisList = read('../MET.json');
    const finalList = [], unfoundList = [];
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
            unfoundList.push(studentThesis);
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
    write('./unfoundThesisList.json', unfoundList);

    return res.status(200).json(finalList);

})

router.get('/unfoundThesisList', async (req, res) => {
    const unfoundList = read('../unfoundThesisList.json');
    return res.status(200).json(unfoundList);
});

router.get('/allCategories', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (!b.foundInMET) {
            return -1;
        }
        if (!a.foundInMET) {
            return 1;
        }
        if (b.category > a.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    });

    const finalList = [];
    var categoryObject = { category: studentThesisList[0].category };
    var categoryList = [];
    for (var i = 0; i < studentThesisList.length; i++) {
        if (studentThesisList[i].category === categoryObject.category) {
            categoryList.push(studentThesisList[i]);
        }
        else {
            categoryObject.thesisList = categoryList;
            finalList.push(categoryObject);
            if (!studentThesisList[i].category) break;
            categoryObject = { category: studentThesisList[i].category };
            categoryList = [];
            categoryList.push(studentThesisList[i]);
        }
    }

    console.log(finalList.length);
    write('./allCategories.json', finalList);
    return res.status(200).json(finalList);
});

router.get('/allSupervisors', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (b.supervisorInStudent > a.supervisorInStudent) {
            return -1;
        }
        if (a.supervisorInStudent > b.supervisorInStudent) {
            return 1;
        }
        return 0;
    });

    const finalList = [];
    var supervisorObject = { supervisor: studentThesisList[0].supervisorInStudent };
    var supervisorList = [];
    for (var i = 0; i < studentThesisList.length; i++) {
        if (studentThesisList[i].supervisorInStudent === supervisorObject.supervisor) {
            supervisorList.push(studentThesisList[i]);
        }
        else {
            supervisorObject.thesisList = supervisorList;
            finalList.push(supervisorObject);
            supervisorObject = { supervisor: studentThesisList[i].supervisorInStudent };
            supervisorList = [];
            supervisorList.push(studentThesisList[i]);
        }
    }

    write('./allSupervisors.json', finalList);
    return res.status(200).json(finalList);
});


module.exports = router;

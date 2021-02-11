const express = require('express');
const router = express.Router();
const { read, write, checkExistsWithTimeout } = require('../utils/fileUtils.js');
const axios = require('axios');

router.get('/totalThesisNum', async (req, res) => {
    checkExistsWithTimeout('../entireThesisList.json', 500)
        .then(() => {
            const studentThesisList = read('../entireThesisList.json');
            return res.status(200).send({ totalThesisNum: studentThesisList.length });
        })
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/writeEntireThesisList');
            const studentThesisList = read('../entireThesisList.json');
            return res.status(200).send({ totalThesisNum: studentThesisList.length });
        });

});

router.get('/unfoundThesisNum', async (req, res) => {
    checkExistsWithTimeout('../unfoundThesisList.json', 500)
        .then(() => {
            const studentThesisList = read('../unfoundThesisList.json');
            return res.status(200).send({ unfoundThesisNum: studentThesisList.length });
        })
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/writeUnfoundThesisList');
            const studentThesisList = read('../unfoundThesisList.json');
            return res.status(200).send({ unfoundThesisNum: studentThesisList.length });
        });
});

router.get('/numberPerCategory', async (req, res) => {
    checkExistsWithTimeout('../allCategories.json', 500)
        .then(() => {
            const studentThesisList = read('../allCategories.json');
            const returnArray = studentThesisList.map((category) => {
                const updatedCategory = { category: category.category };
                updatedCategory.num = category.thesisList.length;
                return updatedCategory;
            });
            return res.status(200).json(returnArray);
        })
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/allCategories');
            const studentThesisList = read('../allCategories.json');
            const returnArray = studentThesisList.map((category) => {
                const updatedCategory = { category: category.category };
                updatedCategory.num = category.thesisList.length;
                return updatedCategory;
            });
            return res.status(200).json(returnArray);
        });
});

router.get('/totalCategoryNum', async (req, res) => {
    checkExistsWithTimeout('../allCategories.json', 500)
        .then(() => {
            const studentThesisList = read('../allCategories.json');
            return res.status(200).json({ num: studentThesisList.length });
        })
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/allCategories');
            const studentThesisList = read('../allCategories.json');
            return res.status(200).json({ num: studentThesisList.length });
        });
});

router.get('/numberPerSupervisor', async (req, res) => {
    checkExistsWithTimeout('../allSupervisors.json', 500)
        .then(() => {
            const studentThesisList = read('../allSupervisors.json');
            const returnArray = studentThesisList.map((supervisor) => {
                const updatedSupervisor = { supervisor: supervisor.supervisor };
                updatedSupervisor.num = supervisor.thesisList.length;
                return updatedSupervisor;
            });
            return res.status(200).json(returnArray);
        })
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/allSupervisors');
            const studentThesisList = read('../allSupervisors.json');
            const returnArray = studentThesisList.map((supervisor) => {
                const updatedSupervisor = { supervisor: supervisor.supervisor };
                updatedSupervisor.num = supervisor.thesisList.length;
                return updatedSupervisor;
            });
            return res.status(200).json(returnArray);
        });
});

router.get('/totalSupervisorNum', async (req, res) => {
    checkExistsWithTimeout('../allSupervisors.json', 500)
    .then(() => {
        const studentThesisList = read('../allSupervisors.json');
        return res.status(200).json({ num: studentThesisList.length });
    })
    .catch(async (error) => {
        await axios.get('http://localhost:5000/api/allSupervisors');
        const studentThesisList = read('../allSupervisors.json');
        return res.status(200).json({ num: studentThesisList.length });
    });
});

module.exports = router;
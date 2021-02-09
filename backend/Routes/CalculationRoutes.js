const express = require('express');
const router = express.Router();
const { read, write, checkExistsWithTimeout } = require('../utils/fileUtils.js');

router.get('/totalThesisNum', async (req, res) => {
    await checkExistsWithTimeout('../entireThesisList.json', 5000);
    const studentThesisList = read('../entireThesisList.json');
    return res.status(200).send({totalThesisNum: studentThesisList.length});
});

router.get('/unfoundThesisNum', async (req, res) => {
    await checkExistsWithTimeout('../unfoundThesisList.json', 5000);
    const studentThesisList = read('../unfoundThesisList.json');
    return res.status(200).send({unfoundThesisNum: studentThesisList.length});
});

router.get('/numberPerCategory', async (req, res) => {
    await checkExistsWithTimeout('../allCategories.json', 5000);
    const studentThesisList = read('../allCategories.json');
    const returnArray = studentThesisList.map((category) => {
        const updatedCategory = {category: category.category};
        updatedCategory.num = category.thesisList.length;
        return updatedCategory;
    });
    return res.status(200).json(returnArray);
});

router.get('/totalCategoryNum', async (req, res) => {
    await checkExistsWithTimeout('../allCategories.json', 5000);
    const studentThesisList = read('../allCategories.json');
    return res.status(200).json({num: studentThesisList.length});
});

router.get('/numberPerSupervisor', async (req, res) => {
    await checkExistsWithTimeout('../allSupervisors.json', 5000);
    const studentThesisList = read('../allSupervisors.json');
    const returnArray = studentThesisList.map((supervisor) => {
        const updatedSupervisor = {supervisor: supervisor.supervisor};
        updatedSupervisor.num = supervisor.thesisList.length;
        return updatedSupervisor;
    });
    return res.status(200).json(returnArray);
});

router.get('/totalSupervisorNum', async (req, res) => {
    await checkExistsWithTimeout('../allSupervisors.json', 5000);
    const studentThesisList = read('../allSupervisors.json');
    return res.status(200).json({num: studentThesisList.lenght});
});

module.exports = router;
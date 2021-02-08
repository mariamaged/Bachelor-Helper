const express = require('express');
const router = express.Router();
const { read, write } = require('../utils/fileUtils.js');

router.get('/totalThesisNum', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    return res.status(200).send({totalThesisNum: studentThesisList.length});
});

router.get('/unfoundThesisNum', async (req, res) => {
    const studentThesisList = read('../unfoundThesisList.json');
    return res.status(200).send({unfoundThesisNum: studentThesisList.length});
});

router.get('/numberPerCategory', async (req, res) => {
    const studentThesisList = read('../allCategories.json');
    const returnArray = studentThesisList.map((category) => {
        const updatedCategory = {category: category.category};
        updatedCategory.num = category.thesisList.length;
        return updatedCategory;
    });
    return res.status(200).json(returnArray);
});

router.get('/numberPerSupervisor', async (req, res) => {
    const studentThesisList = read('../allSupervisors.json');
    const returnArray = studentThesisList.map((supervisor) => {
        const updatedSupervisor = {supervisor: supervisor.supervisor};
        updatedSupervisor.num = supervisor.thesisList.length;
        return updatedSupervisor;
    });
    return res.status(200).json(returnArray);
});

module.exports = router;
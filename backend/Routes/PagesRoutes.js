// For routing.
const express = require('express');
const router = express.Router();
const { read, write, checkExistsWithTimeout } = require('../utils/fileUtils.js');
const axios = require('axios');

router.get('/allCategories', async (req, res) => {
    checkExistsWithTimeout('../entireThesisList.json', 500)
        .then(() => {
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
            var categoryObject = { category: studentThesisList[0].category, categoryDescription: studentThesisList[0].categoryDescription };
            var categoryList = [];
            for (var i = 0; i < studentThesisList.length; i++) {
                if (studentThesisList[i].category === categoryObject.category) {
                    categoryList.push(studentThesisList[i]);
                }
                else {
                    categoryObject.thesisList = categoryList;
                    finalList.push(categoryObject);
                    if (!studentThesisList[i].foundInMET) break;
                    categoryObject = { category: studentThesisList[i].category, categoryDescription: studentThesisList[i].categoryDescription };
                    categoryList = [];
                    categoryList.push(studentThesisList[i]);
                }
            }

            write('./allCategories.json', finalList);
            return res.status(200).send('Operation Successful!');
        })
        .catch(async (error) => {
            await axios.get('http://localhost:5000/api/writeEntireThesisList');
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
            var categoryObject = { category: studentThesisList[0].category, categoryDescription: studentThesisList[0].categoryDescription };
            var categoryList = [];
            for (var i = 0; i < studentThesisList.length; i++) {
                if (studentThesisList[i].category === categoryObject.category) {
                    categoryList.push(studentThesisList[i]);
                }
                else {
                    categoryObject.thesisList = categoryList;
                    finalList.push(categoryObject);
                    if (!studentThesisList[i].foundInMET) break;
                    categoryObject = { category: studentThesisList[i].category, categoryDescription: studentThesisList[i].categoryDescription };
                    categoryList = [];
                    categoryList.push(studentThesisList[i]);
                }
            }

            write('./allCategories.json', finalList);
            return res.status(200).send('Operation Successful!');
        })

});

router.get('/allSupervisors', async (req, res) => {
    checkExistsWithTimeout('../entireThesisList.json', 500)
    .then(() => {
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
        return res.status(200).send('Operation Successful!');
    })
    .catch(async (error) => {
        await axios.get('http://localhost:5000/api/writeEntireThesisList');
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
        return res.status(200).send('Operation Successful!');
    });
    
});

router.get('/categories', async (req, res) => {
    checkExistsWithTimeout('../allCategories.json', 500)
    .then(() => {
        const categories = read('../allCategories.json');
        return res.status(200).json(categories);
    })
    .catch(async (error) => {
        await axis.get('http://localhost:5000/api/allCategories');
        const categories = read('../allCategories.json');
        return res.status(200).json(categories);
    })
});

router.get('/supervisors', async (req, res) => {
    checkExistsWithTimeout('../allSupervisors.json', 500)
    .then(() => {
        const supervisors = read('../allSupervisors.json');
        return res.status(200).json(supervisors);
    })
    .catch(async (error) => {
        await axis.get('http://localhost:5000/api/allSupervisors');
        const supervisors = read('../allSupervisors.json');
        return res.status(200).json(supervisors);
    })
})

module.exports = router;
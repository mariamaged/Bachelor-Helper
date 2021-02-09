const express = require('express');
const router = express.Router();
const { read, write } = require('../utils/fileUtils.js');

//-----------------------------------------------------------------------
// Entire Routes
router.get('/entireSortCategoryAscending', async (req, res) => {
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

    return res.status(200).json(studentThesisList);
});

router.get('/entireSortCategoryDescending', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (!b.foundInMET) {
            return -1;
        }
        if (!a.foundInMET) {
            return 1;
        }
        if (a.category > b.category) {
            return -1;
        }
        if (b.category > a.category) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/entireSortSupervisorAscending', async (req, res) => {
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

    return res.status(200).json(studentThesisList);
});



router.get('/entireSortSupervisorDescending', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (a.supervisorInStudent > b.supervisorInStudent) {
            return -1;
        }
        if (b.supervisorInStudent > a.supervisorInStudent) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/entireSortThesisNameAscending', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (b.thesisName > a.thesisName) {
            return -1;
        }
        if (a.thesisName > b.thesisName) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/entireSortThesisNameDescending', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (a.thesisName > b.thesisName) {
            return -1;
        }
        if (b.thesisName > a.thesisName) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/entireSortIDDescending', async (req, res) => {
    const studentThesisList = read('../entireThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (a.id > b.id) {
            return -1;
        }
        if (b.id > a.id) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});

//-------------------------------------------------------------------------------------
// Unfound Routes

router.get('/unfoundSortSupervisorAscending', async (req, res) => {
    const studentThesisList = read('../unfoundThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (b.supervisorInStudent > a.supervisorInStudent) {
            return -1;
        }
        if (a.supervisorInStudent > b.supervisorInStudent) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});



router.get('/unfoundSortSupervisorDescending', async (req, res) => {
    const studentThesisList = read('../unfoundThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (a.supervisorInStudent > b.supervisorInStudent) {
            return -1;
        }
        if (b.supervisorInStudent > a.supervisorInStudent) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/unfoundSortThesisNameAscending', async (req, res) => {
    const studentThesisList = read('../unfoundThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (b.thesisName > a.thesisName) {
            return -1;
        }
        if (a.thesisName > b.thesisName) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/unfoundSortThesisNameDescending', async (req, res) => {
    const studentThesisList = read('../unfoundThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (a.thesisName > b.thesisName) {
            return -1;
        }
        if (b.thesisName > a.thesisName) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});


router.get('/unfoundSortIDDescending', async (req, res) => {
    const studentThesisList = read('../unfoundThesisList.json');
    studentThesisList.sort(function (a, b) {
        if (a.id > b.id) {
            return -1;
        }
        if (b.id > a.id) {
            return 1;
        }
        return 0;
    });

    return res.status(200).json(studentThesisList);
});
module.exports = router;
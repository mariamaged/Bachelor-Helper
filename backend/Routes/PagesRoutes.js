// For routing.
const express = require('express');
const router = express.Router();
const { read, write } = require('../utils/fileUtils.js');

router.get('/categories', async (req, res) => {
    const categories = read('../allCategories.json');
    return res.status(200).json(categories);
});

router.get('/supervisors', async (req, res) => {
    const categories = read('../allSupervisors.json');
    return res.status(200).json(categories);
})


module.exports = router;
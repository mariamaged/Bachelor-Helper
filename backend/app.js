const TableRoutes = require('./Routes/TablesRoutes.js');
const FilterRoutes = require('./Routes/FilterRoutes.js');
const CalculationRoutes = require('./Routes/CalculationRoutes.js');

const express = require('express');
const app = express();
app.use(express.json());

// app.use().
app.use('/api', TableRoutes);
app.use('/api', FilterRoutes);
app.use('/api', CalculationRoutes);

// Exporting the app.
module.exports.app = app;
const InitializationRoutes = require('./Routes/InitializationRoutes.js');
const FilterRoutes = require('./Routes/FilterRoutes.js');
const CalculationRoutes = require('./Routes/CalculationRoutes.js');
const PageRoutes = require('./Routes/PagesRoutes.js');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
    res.header("Access-Control-Expose-Headers", "auth-token");
    next();
  })
app.use(cors());

// app.use().
app.use('/api', PageRoutes);
app.use('/api', InitializationRoutes);
app.use('/api', FilterRoutes);
app.use('/api', CalculationRoutes);

// Exporting the app.
module.exports.app = app;
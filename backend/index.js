// For environmental variables.
require('dotenv').config();

// For app singleton instance.
const { app } = require('./app.js');
const main = require('./Routes/LoadingDataRoutes.js');
const axios = require('axios');

// Listen on Port 
var listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + listener.address().port);
});

(async () => {await main(); 
    await axios.get('http://localhost:5000/api/entireThesisList'); 
    await axios.get('http://localhost:5000/api/allCategories');
    await axios.get('http://localhost:5000/api/allSupervisors');
    })();




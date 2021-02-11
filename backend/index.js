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
    await axios.get('http://localhost:5000/api/writeEntireThesisList');
    console.log('Entire thesis written.'); 
    await axios.get('http://localhost:5000/api/writeUnfoundThesisList'); 
    console.log('Unfound thesis written.'); 
    await axios.get('http://localhost:5000/api/allCategories');
    console.log('All categories written.'); 
    await axios.get('http://localhost:5000/api/allSupervisors');
    console.log('All supervisors written.'); 
    console.log('Done!');
    })();




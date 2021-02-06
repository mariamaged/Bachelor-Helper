// For environmental variables.
require('dotenv').config();

// For app singleton instance.
const {app} = require('./app.js');

// Listen on Port 
var listener = app.listen(process.env.PORT, function(){
    console.log('Listening on port ' + listener.address().port);
});


require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    { SERVER_PORT, CONNECTION_STRING } = process.env,
    app = express();

//Middleware
app.use(express.json());

//Connect to our DB
massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log(`MyCanyon DB Connected!`);
}).catch(err => console.log(`Error: ${err.message}`));

//Listen for changes on our server
app.listen(SERVER_PORT, console.log(`MyCanyon listening on ${SERVER_PORT}`));
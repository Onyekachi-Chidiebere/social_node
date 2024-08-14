/**
 * This is the entry file that listens to port;
 */
const express = require('express');
const cors = require('cors');
const router = require('./router');
const  dbConnection  = require('./utils/db-connection');
const port = process.env.PORT;

// initalize app
const app = express();


// add cors first before route
app.use(cors({ origin: '*' }));

app.use('/', router);

// connect to database;
dbConnection();

// initalize server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

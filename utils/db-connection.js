const mongoose = require('mongoose');
const dotenv = require('dotenv');
/**
 * This handles connecting the application to mongodb;
 */
dotenv.config();

const mongoDbConnection = () =>
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('connected to db');
        })
        .catch((error) => console.log({ error }));

module.exports = mongoDbConnection;


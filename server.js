const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const express = require('express');
const app = express();
const routes = require('./src/router');
const dbConnection = require("./src/db/connect");
let port = process.env.PORT;
//load all middleware
dbConnection();
app.use(express.json());

routes.map((ele) => {
    app.use(ele.path, ele.routerHandler)
});
app.use((req, res, next) => {
    return res.status(400).json({
        success: false,
        data: null,
        message: 'not found'
    });
});

app.use((error, req, res, next) => {
    return res.status(500 || error.status).json({
        success: false,
        data: null,
        message: error.message || 'Internal success error'
    });
});

app.listen(port, (error) => {
    if (error) {
        throw Error(error);
    }
    else {
        console.log("server is running on port", port);
    }
})
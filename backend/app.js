const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');

const product = require('./routes/productRoute');

app.use(express.json());

//Routes imports;
app.use("/api/v1",product);

//MiddleWare for Error
app.use(errorMiddleware);


module.exports = app;
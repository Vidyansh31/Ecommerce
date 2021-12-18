const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');

//Routes imports;
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//MiddleWare for Error
app.use(errorMiddleware);


module.exports = app;
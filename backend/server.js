const app = require('./app');

const dotenv = require('dotenv');

// config
dotenv.config({path:'backend/config/config.env'});

// Listening to the server on port
app.listen(process.env.PORT,()=>{
    console.log(`listening on port http://localhost:${process.env.PORT}`)
})
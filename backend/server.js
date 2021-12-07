const app = require('./app');

const dotenv = require('dotenv');

//Importing database
const connectDatabase = require('./config/database');

//Uncaught Rejection Error
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down due to Uncaught Exception`);
    process.exit(1);
})



// Creating port if it not listening on process.env.port than it will switch on 3000
const port = process.env.PORT || 3000;

// config
dotenv.config({path:'backend/config/config.env'});

//Connecting to Database
connectDatabase();

// Listening to the server on port
const server = app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`)
})

// unhandled Promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
})
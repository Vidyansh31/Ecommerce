const app = require('./app');

const dotenv = require('dotenv');

// Creating port if it not listening on process.env.port than it will switch on 3000
const port = process.env.PORT || 3000;

// config
dotenv.config({path:'backend/config/config.env'});

// Listening to the server on port
app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`)
})
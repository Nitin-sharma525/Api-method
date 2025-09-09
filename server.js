const express = require ('express'); // Require the express module
const app = express(); //Express application
const connectDB  = require('./helper/index');// Import the database connection function
const router = require('./router/index');// Import your route handlers
require('dotenv').config()// Load environment variables from .env file
const port = 3000;// Define a port number for the server
 connectDB;// Connect to the database
 app.use(express.json());// JSON body parsing middleware
 

 app.get('/',(req,res)=>{//route to handle a get request
     res.send('Hello world');
 })
 app.use('/api/form', router);
app.listen(port,()=>{ //start server and listen port
    console.log(`server is running at http://localhost:${port}`);
})
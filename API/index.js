require("dotenv").config()
var express = require('express');
const {connectToMongoDB,} = require("./database")
const cors = require('cors');


const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(cors());
app.use(express.json())


const router = require('./routes')
app.use("/api", router)

const port = process.env.PORT || 5000

async function startServer(){
    await connectToMongoDB();
    app.listen(port, ()=>{
        console.log(`Connected to database http://localhost:${port}`)
    })
}
startServer()
require ("dotenv").config()
const{MongoClient, ServerApiVersion} = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/skincaredb"

const option ={
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
}

let client;
const connectToMongoDB = async () => {
    if(!client) {
        try {
            client = await MongoClient.connect(uri, option)
            console.log("Connected to MongoDB")
        } catch (error) {
            console.error(error);
        }
    }
    return client;
}


const getConnectedClient = () => client

module.exports = {
    connectToMongoDB,
    getConnectedClient
}
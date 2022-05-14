const express=require('express')
const app=express()
// const { MongoClient } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());
const port=process.env.PORT||5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rf3gx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Hitting the database')
//   client.close();
// });


async function run(){
    try {
        await client.connect();
        const database = client.db('translatorRobberLanguage');
        console.log('Database Connected Successfully')
    
} finally {
    await client.close();

}}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running translator wonderfully')
});




app.listen(port, () => {
    console.log('Running volunteer network on port', port)
})
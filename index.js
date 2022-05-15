const express=require('express')
const app=express()
// const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());
const port=process.env.PORT||5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rf3gx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const bodyParser = require('body-parser');

// app.use(bodyParser());
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
        const inputEnglishTextCollection=database.collection('normal');
        const translatedRövarspråkCollection=database.collection('rovarsprak')
        app.get('/normal',async(req,res)=>{
            const cursor=inputEnglishTextCollection.find({});
            const text=await cursor.toArray();
            res.send(text)
        })
        app.get('/normal/:textId',async(req,res)=>{
            const id=req.params.offerId;
        const query={_id:ObjectId(id),
                   };
        const text=await inputEnglishTextCollection.findOne(query);
        res.json(query)
        })
        app.post('/translate/normal', async (req, res) => {
            const textInput = req.body;
               const result = await inputEnglishTextCollection.insertOne(textInput);
               res.json(result);})
     
  
        
  

        console.log('Database Connected Successfully')
    
} finally {
   

}}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running translator wonderfully')
});




app.listen(port, () => {
    console.log('Running volunteer network on port', port)
})
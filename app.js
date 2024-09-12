const express = require('express')
const app = express()
const env = require('dotenv').config()
const bodyParser = require("body-parser")
const { urlencoded } = require("body-parser")
const { objectID } = require("mongodb");

app.set('view engine', 'ejs')
console.log("I'm on a node server")

app.use(express.static('./public/'))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/mongo', async(req, res)=>{
  await client.connect();
  let result = await client.db("johnny-db").collection("whatever").find({}).toArray();
  console.log(result)
  res.render("mongo.ejs", {
    query: result
  })
  console.log("Sent result to browser")
})


app.get('/', function (req, res) {
  //outdated way
  //res.send('Hello Node From Express on local devbox :))))')
  res.sendFile(__dirname + '/index.html')
  res.sendFile(__dirname + '/styles/style.css')
  res.sendFile(__dirname + '/scripts/script.js')
})

app.get('/ejs', (req, res)=>{
    res.render("index", {
      myServerVariable: "Something from server"
    })
})

app.get('/read', async (req, res)=>{
  await client.connect();
  //Read
  let result = await client.db("johnny-db").collection("whatever").find({}).toArray()
  res.render("read.ejs", {
    mongoResult: result
  })
})

app.get('/insert', async (req, res)=>{
  await client.connect();
  //Insert
  await client.db("johnny-db").collection("whatever").insertOne({post: "hardcoded post insert"});
  res.render("insert.ejs")
})

app.get('/update', async (req, res)=>{
  let result = await client.db("johnny-db").collection("whatever").find({}).toArray()
  res.render("update.ejs", {
    postData: result
  })
  await client.connect();
  //Insert
  await client.db("johnny-db").collection("whatever").updateOne({post: "hardcoded post insert"}, {$set: {post: "Updated hardcoded post"}});
  
})

app.listen(5000)
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')
console.log("I'm on a node server")

app.use(express.static('./public/'))


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
    //await client.close();
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
})


app.get('/', async (req, res)=>{
  await client.connect();
  
  let result = await client.db("johnny-db").collection("democracy")
    .find({}).toArray(); 

  res.render('index.ejs', {
    postData : result
  });
})

app.get('/insert', async (req, res)=>{
  client.connect; 
  const collection = client.db("johnny-db").collection("democracy");
  
  let result = await collection.insertOne(
    {
      option1: req.query.option1,
      option2: req.query.option2,
      votes1: 0,
      votes2: 0
    }
  )
    .then(result => {
      res.redirect('/');
    })
})

app.post('/update1/:id', async (req,res)=>{
  client.connect; 
  const collection = client.db("johnny-db").collection("democracy");

  let currentVotes = await collection.findOne( 
    {"_id": new ObjectId(req.params.id)});

  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"votes1": Number(currentVotes.votes1) + 1 } }
  )
  .then(result => {
    res.redirect('/');
  })

})

app.post('/update2/:id', async (req,res)=>{
  client.connect; 
  const collection = client.db("johnny-db").collection("democracy");

  let currentVotes = await collection.findOne( 
    {"_id": new ObjectId(req.params.id)});

  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"votes2": Number(currentVotes.votes2) + 1 } }
  )
  .then(result => {
    res.redirect('/');
  })

})

app.post('/delete/:id', async (req,res)=>{
  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("johnny-db").collection("democracy");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)}
  )
  .then(result => {
    res.redirect('/');
  })
})



//old ejs stuff

app.get('/ejs', (req, res)=>{
    res.render("ejs", {
      myServerVariable: "Something from server"
    })
})

app.get('/read', async (req, res)=>{
  await client.connect();
  
  let result = await client.db("johnny-db").collection("whatever")
    .find({}).toArray(); 

  res.render('read.ejs', {
    postData : result
  });
})

app.get('/insertejs', async (req, res)=>{
  await client.connect();
  await client.db("johnny-db").collection("whatever").insertOne({post: "hardcoded post insert"});
  res.render("insertejs.ejs")
})

app.post('/updateejs/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("johnny-db").collection("whatever");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
  )
  .then(result => {
    res.redirect('/read');
  })
})

app.post('/deleteejs/:id', async (req,res)=>{
  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("johnny-db").collection("whatever");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)}
  )
  .then(result => {
    res.redirect('/read');
  })
})


app.listen(PORT);
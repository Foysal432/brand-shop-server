const express =require('express');
require('dotenv').config()
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app =express();
const port =process.env.PORT || 5000;

// middle were
app.use(cors());
app.use(express.json());


// from mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bdlhstb.mongodb.net/?retryWrites=true&w=majority`;


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
    const brandCollection =client.db('brandDB').collection('brands')
    app.get('/brands',async(req,res)=>{
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.post('/brands', async(req,res)=>{
        const newBrands =req.body;
        console.log(newBrands);
        const result = await brandCollection.insertOne(newBrands)
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// from mongodb


app.get('/',(req,res)=>{
    res.send('SIMPLE CRUD IS RUNNING')
})
app.listen(port,()=>{
    console.log(`SIMPLR CRUD IS Running port,${port}`);
})
const express =require('express');
require('dotenv').config()
const cors =require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const alliteamCollection=client.db('brandDB').collection('items')
    const addCardCollection=client.db('brandDB').collection('addproduct')
    app.get('/brands',async(req,res)=>{
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })


// // addcardget
// app.get('/addproduct/:email',async(req,res)=>{
//   const email = req.params.email;
//  const query ={email:email}
//  const user =await addCardCollection.findOne(query);
//   res.send(user)
// })
app.get('/addproduct/:email',async(req,res)=>{
  const email = req.params.email;
  const query ={email:email}
  const user = addCardCollection.find(query);
  const result = await user.toArray() 
  res.send(result)
})

// add product post
 // alliteamcollection
 app.post('/addproduct',async(req,res)=>{
  const card =req.body;
  console.log(card);
  const result =await addCardCollection.insertOne(card)
  res.send(result)
})


app.get('/addproduct',async(req,res)=>{
  const cursor = addCardCollection.find();
  const result = await cursor.toArray();
  res.send(result)
})


// delate operation
app.delete('/addproduct/:id',async(req,res)=>{
  const id = req.params.id;
  const query ={_id:new ObjectId(id)}
  const result =await addCardCollection.deleteOne(query)
  res.send(result)
})

// get all brand item
app.get('/items/:brand',async(req,res)=>{
  const brand = req.params.brand;
  const query ={brand:brand}
  const branditem = alliteamCollection.find(query);
  const result = await branditem.toArray() 
  res.send(result)
})


// get detail a item
app.get('/items1/:detail',async(req,res)=>{
  const detail =req.params.detail;
  const query ={_id: new ObjectId(detail)};
  const user = await alliteamCollection.findOne(query);
  res.send(user)
})

// // update item
app.get('/update/:id',async(req,res)=>{
  const id =req.params.id;
  const query ={_id:new ObjectId(id)};
  const user = await alliteamCollection.findOne(query);
  res.send(user)
})


// update
app.put('/update/:id',async(req,res)=>{
  const id =req.params.id;
  const filter ={_id: new ObjectId(id)}
  const options ={upsert:true};
  const updateditem = req.body;
  const iteam ={
    $set:{
      name:updateditem.name,
      brand:updateditem.brand,
      type:updateditem.type,
      price:updateditem.price,
      rating:updateditem.rating,
      description:updateditem.description,
      image:updateditem.image
    }
  }
  const result =await alliteamCollection.updateOne(filter,iteam,options);
  res.send(result)
})



    app.post('/brands', async(req,res)=>{
        const newBrands =req.body;
        console.log(newBrands);
        const result = await brandCollection.insertOne(newBrands)
        res.send(result);
    })
    // alliteamcollection
    app.post('/items',async(req,res)=>{
      const allItem =req.body;
      console.log(allItem);
      const result =await alliteamCollection.insertOne(allItem)
      res.send(result)
    })
    app.get('/items',async(req,res)=>{
      const cursor = alliteamCollection.find();
      const result = await cursor.toArray();
      res.send(result)
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
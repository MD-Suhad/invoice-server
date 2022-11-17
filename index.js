const express = require("express");

const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { application } = require("express");

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// userName: invoice-lumex
//password: PVVg7Skv41E3OOcI

// ---------database connected---------

const uri =
  "mongodb+srv://invoice-lumex:PVVg7Skv41E3OOcI@cluster0.5ii5ihy.mongodb.net/?retryWrites=true&w=majority";

//  ---------database connected end-----

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("invoiceCollection");
    const invoiceData = database.collection("invoiceData");

    //---post api---

    
    
   //  app.get('/formData',async(req,res) =>{
   //    const cursor  = formDataCollection.find({});;
   //    const formData =  await cursor.toObject();
   //    res.json(formData);
   //  })
    app.post("/formData", async (req, res) => {
      let { name,
         address,
         email,
         phone,
         invoiceNumber,
         invoiceDate,
         items,
         quantity,
         rate,
         amount,
         list,
         total } = req.body;
      console.log(name,
         address,
         email,
         phone,
         invoiceNumber,
         invoiceDate,
         items,
         quantity,
         rate,
         amount,
         list,
         total);
      //const user_data = req.body;
      const result = await invoiceData.insertMany([]);
      res.json(result)
    });




  } finally {
    await client.close();
  }
}
run().catch();

// client.connect((err) => {
//   const collection = client.db("invoice").collection("Bill");

//   // perform actions on the collection object

//   console.log("successfully added to database");

//   const user =
//    { name: "nazmul", email: "nazmul@gmail.com", payment: "5400" }

//    const user2 = {name:'shohaib',email:'shohaib@gmail.com',payment:"2300"};

//   collection.insertOne(user2)
//   .then(() => {
//     console.log("insert successfully");
//     console.log(user2)
//     //console.error(error);
//   });
//   //client.close();
// });

app.get("/", (req, res) => {
  res.send("hello welcome to invoice site");
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

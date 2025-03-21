const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const mySchema = require("./schema");
const { resolve } = require('path');

const app = express();
const port = 3010;


app.use(express.json());
app.use(express.static('static'));



async function connectDataBase(){
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database")
  } catch (error) {
    console.log("Error connecting to database");
  }
};

connectDataBase();


app.post('/api/users',async (req,res)=>{
  try{
    console.log(req.body)
  const schema = new mySchema(req.body);
  const savedUser = await schema.save();
  res.status(201).send({msg:'user created ',data:savedUser})
}catch(err){
  res.status(500).send({msg:'something went wrong',err})
}


})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
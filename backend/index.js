const express = require('express')
const mongoose = require('mongoose');
const Regulation = require('./models/regulations');
const Users = require('./models/users')
const cors = require('cors');


const app = express()
const port = 3001

app.use(cors({
  origin: 'http://localhost:3000'
}));

const jwt = require('jsonwebtoken'); // For generating tokens
const { expressjwt: expressJwt } = require('express-jwt'); // For protecting routes


app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/CGPA_DB';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


class NotFoundError extends Error {
  constructor(message) {
    super(message); 
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ExistsError extends Error{
  constructor(message){
    super(message);
    this.name="ExistsError";
    this.statusCode=409
  }
}


app.get('/', expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }) ,(req, res) => {
  res.send('Hello World!');
})

app.post('/login',async(req,res)=>{
  const { username,password } = req.body;
  console.log(username,password)
  const user = Users.findOne({ username: username, password: password })
  if (user) {
    // Generate JWT token
    const token = jwt.sign({ username: user.username }, "shhhhhhared-secret", { expiresIn: '1h' });
    
    // Send token back to the client
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
})

app.put('/login',expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),async (req,res)=>{
  try{

    const {username,password,uid} = req.body
    const user = Users.findOne({uid:uid})
    if(!user){
      throw new NotFoundError(message="User Not Found")
    }
    user.username=username;
    user.password=password;
    user.save();
    res.status(200).json({"message":"success"});
  }catch(err){
    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
})

app.get('/regulations',async (req,res)=>{
  const regulations = await Regulation.find();
  console.log(regulations);
  res.json(regulations);
})

app.post('/regulations',expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),async (req,res)=>{
  try{
    const regs = await Regulation.find();
    for(let i=0; i<regs.length;i++){
      if(regs[i].name===req.body.name){
        throw new ExistsError('Regulation already exists')
      }
    }
    const newReg = new Regulation(req.body);
    await newReg.save();
    res.status(201).json(newReg);
  }catch(err){
    if(err instanceof ExistsError){
      res.sendStatus(409).json({'msg':'Regulation already exists'})
    }
  }
})

app.put('/regulations',expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),async (req,res)=>{
  try{
    const regs = await Regulation.find();
    for(let i=0; i<regs.length;i++){
      if(regs[i].name===req.body.name){
        throw new ExistsError('Regulation already exists')
      }
    }
    const reg = await Regulation.findById(req.body._id)
    console.log(reg);
    if(!reg){
      throw new NotFoundError('Regulation Not Found');
    }
    reg.name=req.body.name
    reg.description=req.body.description
    reg.semesters=req.body.semesters
    await reg.save();
    res.status(201).json({"msg":"success"})
  }
  catch(err){
    if(err instanceof NotFoundError || err instanceof ExistsError){
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({"msg":"Internal serever error"});
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
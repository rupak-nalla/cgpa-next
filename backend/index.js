const express = require('express')
const mongoose = require('mongoose');
const Regulation = require('./models/regulations');
const Users = require('./models/users')
const cors = require('cors');

var cals=0
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
  const user = await Users.findOne({ username: username, password: password })
  console.log(user)
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

app.get('/regulations/:id',async (req,res)=>{
  try {
    const regId = req.params.id; // Retrieve the id from the route parameters
    const reg = await Regulation.findById(regId); // Use regId instead of id

    if (!reg) {
      return res.status(404).json({ msg: 'Regulation not found' });
    }

    console.log(reg);
    return res.status(200).json(reg); // Use res.status(200) instead of res.statusCode(200)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
})

app.post('/regulations', expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.branches);

    // Check if regulation already exists
    const regs = await Regulation.find();
    console.log(regs);
    for (let i = 0; i < regs.length; i++) {
      if (regs[i].name === req.body.name) {
        throw new ExistsError('Regulation already exists');
      }
    }

    // Create and save new regulation
    console.log("before save");
    const newReg = new Regulation(req.body);
    await newReg.save();
    console.log("reached");

    // Send successful response
    return res.status(201).json(newReg); // Use return here
  } catch (err) {
    // Handle the ExistsError
    console.log(err);
    if (err instanceof ExistsError) {
      return res.status(409).json({ 'msg': 'Regulation already exists' }); // Use return here
    }

    // Handle other errors
    return res.status(500).json({ 'msg': 'Some error occurred' }); // Use return here
  }
});


app.put('/regulations',expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),async (req,res)=>{
  try{
    console.log("put req")
    const reg = await Regulation.findById(req.body._id);
    console.log(req.body);
    console.log(reg);
    if(!reg){
      throw new NotFoundError('Regulation Not Found');
    }

    // regname change
    console.log("ok-0")
    if(req.body.changes.RegName){
      reg.name=req.body.changes.RegName;
      console.log("ok-regname")
    }

    // modify branches
    console.log("ok-1")
    if (req.body.changes.ModifiedBranches?.length>0){
      req.body.changes.ModifiedBranches.forEach((branch)=>{
        console.log(branch);
        if (branch.newName){
          reg.branches[branch.index].branch_name=branch.newName;
        }
      })
    }
    // add branches (done)
    console.log("ok-2");
    if(req.body.changes.AddBranches.length>0){
      reg.branches.push(...req.body.changes.AddBranches);
      console.log("ok-addBranch")
    }

    // remove branches
    console.log("ok-3")
    if(req.body.changes.RemoveBranches.length>0){
      reg.branches = reg.branches.filter(branch => !req.body.changes.RemoveBranches.includes(branch));
      console.log("ok-removeBranch")
    }

    // add semesters (done)
    console.log("ok-4")
    if(req.body.changes.AddSemesters.length>0){
      console.log(req.body.changes.AddSemesters);
      req.body.changes.AddSemesters.forEach(sem => {
        console.log("Inloop")
        console.log(sem);
        reg.branches[sem.branchIndex].semesters.push(sem.semester);
      });
      // reg.semesters.push(...req.body.changes.AddSemesters);
      console.log("ok-addSem")
    }

    // remove semesters
    console.log("ok-5")
    if(req.body.changes.RemoveSemesters.length>0){
      reg.semesters = reg.semesters.filter(semester => !req.body.changes.RemoveSemesters.includes(semester));
      console.log("ok-removeSem")
    }

    // add subjects (done)
    console.log("ok-6")
    if(req.body.changes.AddSubjects.length>0){
      console.log(req.body.changes.AddSubjects);
      req.body.changes.AddSubjects.forEach((subject)=>{
        // console.log(subject);
        // console.log(reg.branches[subject.branchIndex]);
        reg.branches[subject.branchIndex].semesters[subject.semesterIndex].subjects.push(subject.subject);

        console.log("ok-addSub")
      })
    }

    // remove subjects
    console.log( "ok-7")
    if(req.body.changes.RemoveSubjects.length>0){
      req.body.changes.RemoveSubjects.forEach((subject)=>{
        const semester = reg.semesters.find(semester=>semester.semester===subject.semester);
        semester.subjects = semester.subjects.filter(sub => sub.subjectName!==subject.subjectName);
      })
      console.log("ok-removeSub")
    }

    // modify subjects
    console.log("ok-8")
    if(req.body.changes.ModifySubjects.length>0){
      req.body.changes.ModifySubjects.forEach((subject)=>{
        console.log(subject);
        if (subject.subjectName){
          reg.branches[subject.branchIndex].semesters[subject.semesterIndex].subjects[subject.subjectIndex].subjectName=subject.subjectName;
        }
        if (subject.credits){

          reg.branches[subject.branchIndex].semesters[subject.semesterIndex].subjects[subject.subjectIndex].credits=subject.credits;
        }
        // const semester = reg.semesters.find(semester=>semester.semester===subject.semester);
        // const sub = semester.subjects.find(sub=>sub.subjectName===subject.subjectName);
        // sub.credits=subject.credits;
      })
      console.log("ok-modifySub")
    }
    await reg.save();
    res.status(200).json({"msg":"success"});
    // reg.name=req.body.name
    // reg.description=req.body.description
    // reg.semesters=req.body.semesters
    // await reg.save();
    // {
    //   _id: '67d2c2fb60de623760cb2f68',
    //   changes: {
    //     RegName: '',
    //     AddBranches: [],
    //     RemoveBranches: [],
    //     AddSemesters: [],
    //     RemoveSemesters: [],
    //     AddSubjects: [ [Object] ],
    //     RemoveSubjects: [],
    //     ModifySubjects: []
    //   }
    // }
    // res.status(201).json({"msg":"success"})
  }
  catch(err){
    if(err instanceof NotFoundError || err instanceof ExistsError){
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({"msg":"Internal serever error"});
  }
})

app.delete('/regulations',expressJwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),async (req,res)=>{
  try{
    console.log("delete req");
    console.log(req.body.id);
    // const reg = await Regulation.findById(req.body.id);
    const reg = await Regulation.findByIdAndDelete(req.body.id);

    // console.log(reg);
    if(!reg){
      throw new NotFoundError("Regulation Not Found");
    }
    console.log(reg)
    // await reg.delete();
    res.status(200).json({"msg":"success"});
  }
  catch(err){
    console.error("Error deleting regulation:", err);
    if(err instanceof NotFoundError){
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({"msg":"Internal serever error"});
  }
})


app.post("/increment-calculations",async (req,res) => {
  cals++;
  console.log("incremented");
  console.log(cals);
  res.status(200).json({"msg":"success"});
})

app.get("/get-calculations",async (req,res) => {
  console.log("get calculations");
  res.status(200).json({"cals":cals});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
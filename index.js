const express = require ("express");
require('./config/connect');
const Employe = require('./model/Employe'); 
const app = express(); 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
const PORT=8002;
app.set('view engine','ejs' )
app.set('views','views')
app.get('/index', async (req,res)=> {
   try{
emp = await Employe.find();
res.render('index',{emp : emp});
}
catch (error) {
   res.send(error)
}
})
app.get('/modifier/:id',async (req,res)=>{
   try{
      myid = req.params.id;
      emp = await Employe.findOne({ _id : myid})
      res.render('modifier',{emp : emp});
   }
      catch (error) {
         res.send(error)
      }
      })
app.get('/ajouter',async (req,res)=>{
   try{
   res.render("ajouter")  
   }
      catch (error) {
         res.send(error)
      }
      })
      app.get('/index/supprimer/:id', async(req,res)=>{
         try{ myid =req.params.id;
            e = await  Employe.findOneAndDelete({_id : myid})
            res.redirect('/index');
            }
            catch(error) {
            res.send(error)
            }
            }) 
app.get('/getapi',async(req,res)=>{
      const mypost= await fetch ("https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1")
      const resData=await mypost.json()
      for(let i=0;i<resData.length;i++){
      const commentData = new Employe({
      id : resData[i]['id'],
      imageUrl : resData[i]['imageUrl'],
      firstName: resData[i]['firstName'],
      lastName : resData[i]['lastName'],
      email : resData[i]['email'],
      contactNumber : resData[i]['contactNumber'],
      age : resData[i]['age'],
      dob  :resData[i]['dob'],
      salary : resData[i]['salary'],
      address : resData[i]['address']
      });
      commentData.save()
   }
   res.status(200).json(resData)
})
app.post('/ajouter',async(req,res)=>{
   try {
      data = req.body;
      console.log(data)
      e = new Employe(data);
      saved = await e.save();
      emp = await Employe.find();
      res.render('index',{emp : emp});
   }
   catch(error){
      res.send(error)
   }
})
app.post('/modifier/:id',async(req,res)=>{
   try {
      data = req.body;
      id = req.params.id;
      e = await Employe.findByIdAndUpdate({_id : id},data)
      saved = await e.save();
      emp = await Employe.find();
      res.render('index',{emp : emp});
   }
   catch(error){
      res.send(error)
   }
})
app.get('/idget/:id', async (req,res)=>{
   try {
   myid = req.params.id;
   emp = await Employe.findOne({  id : myid})
res.send(res)   }
   catch(error) {
   res.send(error)
}
})
app.listen(PORT,(req,res)=>{
console.log(`Server is running successfully on port http://localhost:${PORT}`)
})
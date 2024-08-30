const exp = require('constants')
const express=require('express')
const mongoose = require('mongoose')
const path=require('path')
const port=3020

const app=express();
app.use(express.static(__dirname,))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/Portfolio-contacts')
const db = mongoose.connection
db.once('open',()=>{
  console.log('mongoDB is connected')
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    text:String

})
const users=mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post',async (req,res)=>{
    const {name,email,text}=req.body
   const user=new users({

    name,
    email,
    text
   })
   await user.save()
   console.log(users)
   res.send('form submission succefull')
})
app.listen(port,()=>{
    console.log('server is connected')
})


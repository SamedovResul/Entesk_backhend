import UserData from '../models/useData.js'
import mongoose from 'mongoose';
import fs from 'fs'
import { readdirSync, rename } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const getUser = async (req,res, next) =>{
  
 
  try{
    const userData = await UserData.find();
    // console.log(userData)
    res.status(200).json(userData)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}


export const createUser = async (req,res) =>{
  const user = req.body
  // console.log(req.file)
  let files = []

  
  if(req.files){
    req.files.forEach(element => {
      const file = {
        fileName: element.originalname,
        filepath: element.path,
        fileType: element.mimetype
      }
      files.push(file)
    });
    // user.fileName = req.file.originalname
    // user.filepath = req.file.path
    // user.fileType = req.file.mimetype

    user.file = files
    console.log(req.files)
  }

  
  const newUser = new UserData(user)
  try{
    await newUser.save()

    res.status(201).json(newUser)
  }catch{
    res.status(409).json({ message: error.message })
  }
}





export const updateUser = async (req, res) =>{
  const {id} = req.params;


  let update = await UserData.findById(id)
  // console.log(update,'test')
  
  

  let files = []
  if(req.files){
    // console.log(req.files)

    for (let i = 0; i < update.file.length; i++) {
      // console.log(update.file[i].filepath)
      fs.unlinkSync(update.file[i].filepath)
    }

    
    req.files.forEach(element => {
      console.log(element.path)
      const file = {
        fileName: element.originalname,
        filepath: element.path,
        fileType: element.mimetype
      }
      files.push(file)

      

    });
    
  }
  
  let {file,title, text,blogName} = req.body
  file = files



  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)

  const updateUser = {  title, text,blogName, file, _id: id}
  
  await UserData.findByIdAndUpdate(id, updateUser, {new: true})

  // console.log(updateUser)
  
  res.json(updateUser)
}



export const deleteBlog = async (req, res) =>{
  const {id} = req.params;


  

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id:${id}`)
  


  let array = await UserData.findById(id)


  for (let i = 0; i < array.file.length; i++) {
    fs.unlinkSync(array.file[i].filepath)
  }
  await UserData.findByIdAndRemove(id);

  res.json({ message: "Post deleted succesfully" })
}
import  mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: String,
  text: String,
  blogName: String,
  slidefile:{
    fileName: String,
    filePath: String
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const userData = mongoose.model('userData', userSchema)

export default userData
import  mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: String,
  text: String,
  blogName: String,
  file:[Object],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const userData = mongoose.model('userData', userSchema)

export default userData
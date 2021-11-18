import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routers/router.js'
import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import __dirname from 'path';


const app = express()
dotenv.config()



app.use(cors())



app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/users', userRoutes)
app.get('/', (req,res) =>{
  re.send("hello world")
})
// const CONNECTION_URL = "mongodb+srv://Rasul:resul1418@cluster0.kihs8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";





const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen((PORT), () => console.log(`server running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))



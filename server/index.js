const express = require("express")
const dotenv  = require("dotenv")
const dbConnection = require('./db/dbIndex');   
const userRouter = require('./routes/userRoutes')

const app = express()
dotenv.config();


const PORT = process.env.PORT ; 
// console.log(PORT);
app.use(express.json());

app.use('/user', userRouter);


app.get('/jokes' , (req,res)=> {
    res.send("hello bruh all its a joke")
})  

app.listen(PORT , ()=>{
    console.log('listning at port om ',  PORT);  
})
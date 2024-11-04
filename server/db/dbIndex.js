const mongoose = require ('mongoose');
const dotenv = require("dotenv")
dotenv.config();


( async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> console.log('db connected ')).catch((e)=>console.log("erro",e))
    }
    catch(e){
        console.log('full error ', e.message);
    }
})();


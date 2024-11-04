const jwt= require('jsonwebtoken')

const authincate= async(req,res, next)=> {
    const Token = req.headers['authorization']?.split(' ')[1] 
    if(!Token){
        return res.status(400).json({message:'Bad Authorization'})
    }
    try {
        const decodedToken = await jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)

        if(decodedToken){
        req.user = decodedToken
          next()
        }
        if(!decodedToken) console.log('baler error');
        
    } catch (error) {
        return res.status(401).json({message:'Authorization failed  !', error:error.message})
    }
  
}

const generateToken =(username)=>{
    const token = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
    return  token
}  
module.exports = {generateToken, authincate}
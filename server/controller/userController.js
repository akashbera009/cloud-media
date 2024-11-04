const {User , UploadImage} = require("../models/userModel") 
 const {uploadOnCloudinary , deleteOnCloudinary} = require('../utils/cloudinary')
 const {generateToken} = require('../middleware/authincate.middleware')



const registerFunction = async (req,res)=>{
    const {username, email , password} = req.body ; 
     try{
      const ifExist = await User.findOne({email})  ;
      console.log(ifExist); 
      if(ifExist){
        res.status(200).json({message:'Already registered '})   
      }else{
          const newUser = new User({username, email , password}); 
          await newUser.save(); 
  
          res.status(201).json({message:'registration done '})
      }
     }
     catch(e){
      console.log(e);
      res.status(500).json({message:'registration error is', e})
      
     }
  }

const  loginFunction =  async(req,res)=>{
    const {username , password } = req.body ;
        // const isPasswordValid =  await user.isPasswordCorrect()
        // console.log(isPasswordValid);
        // const user = await User.findOne({username})
        // console.log(user);
    
     try{
        const user = await User.findOne({username})
        console.log(user);
        if(user){
            if(password == user.password){
            // if(isPasswordValid){

                const token  = generateToken(username)

                res.status(200).json({message: 'Successfully loggged in ' , token ,username,ifSuccess:true} )
            }else{
                res.status(400).json({message: 'Invalid password' , ifSuccess: false})
            }
        }
        else{
            res.status(400).json({message: 'Invalid user ' , ifSuccess: false})
        }
     } catch(e){
        res.status(500).json({ message: 'Error logging in', e , ifSuccess: false});
     }
}


const uploadFile = async (req, res) => {
    const owner  = req.body.owner;
    const file = req.file; // Access the uploaded file
// console.log('owner name',req.body.owner);

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        
        const result = await uploadOnCloudinary(file.path);

        if (!result) {
            return res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
        }
        
        const newImage = new UploadImage({
            filePath: result.secure_url, // Get the secure URL from Cloudinary
            filename: result.original_filename,
            fileSize:result.bytes,
            fileDimension:[result.width ,result.height],
            fileForamt:result.format,
            public_id:result.public_id,
            owner,
        });

        await newImage.save(); // Save the record to MongoDB

        res.status(201).json({ message: 'File saved successfully', data: newImage });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to upload file', error: e });
    }
};
const viewUserImages = async (req, res) => {
    const { owner } = req.body; // Accessing owner from URL parameters
    // console.log(req);
    // console.log(owner);
    
    try {
        const images = await UploadImage.find({ owner }); // Adjust based on your database schema
        // console.log(images);
        
        res.status(200).json(images); // Return the images as JSON response
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Error fetching images", error });
    }
};

const deleteFile = async(req,res)=>{
    const {owner , public_id } =req.body
    try{
         await deleteOnCloudinary(public_id)
         console.log('deleted from cloudinary ');
         const response = await UploadImage.deleteOne({ public_id: public_id });
         res.status(200).json({message:'Successfully Deleted '})
         console.log('deleted from mongodb ');
         console.log(response);
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "An error occurred while deleting the file" });
    }
   
    
    
}
module.exports = { loginFunction, registerFunction, uploadFile, viewUserImages , deleteFile};

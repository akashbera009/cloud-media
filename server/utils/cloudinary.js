const cloudinary = require('cloudinary').v2;
const fs = require('fs');


    // Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
const uploadOnCloudinary = async (localFilePath)=>{   // uploadonClouinary = store filepath / public link   
    try{
        if (!localFilePath) return null // if there is no file path 
        // upload file on cloudinary
        
        // const response = await cloudinary.uploader.upload(localFilePath, 
        //    { resourc_type : "auto"}
        // ) 
        const response = await cloudinary.uploader.upload(localFilePath, 
            { resource_type: "auto"}
        )
        //file has been uploaded successfully , now 
        console.log('file is uploaded on clouinary ', response.url);
        fs.unlinkSync(localFilePath) 
        return response ; 
    }catch(error){
        fs.unlinkSync(localFilePath)   
        return null;
    }
}

const deleteOnCloudinary = async (publicId) => {
    try {
        if (!publicId) return null 
        const result = await cloudinary.uploader.destroy(publicId);
        // console.log("Delete result:", result);
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};

 module.exports =  {uploadOnCloudinary , deleteOnCloudinary}

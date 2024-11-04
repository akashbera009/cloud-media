const express  = require ("express");
// const {User} =  require('../models/userModel')
const  {loginFunction,registerFunction , uploadFile ,viewUserImages , deleteFile} = require( '../controller/userController')
const  {authincate} = require( '../middleware/authincate.middleware')

// import upload from '../middleware/multer.middleware'
 const upload = require('../middleware/multer.middleware')
 const generateTken = require('../middleware/multer.middleware')

const router = express.Router()

// user/..
router.post('/register', registerFunction);  

router.post('/login',loginFunction);

router.post('/upload', authincate ,upload.single('file') ,uploadFile);

// router.post('/images/' ,viewUserImages);
router.post('/images/' ,authincate ,viewUserImages);

router.post('/images/delete' ,authincate , deleteFile);


module.exports = router; 

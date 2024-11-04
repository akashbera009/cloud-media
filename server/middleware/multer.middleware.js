const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)   // as this file will be stored in the local for a tiny amount of time same name may be tolarated ......
    }
  })
  
const upload = multer({ storage: storage });
module.exports = upload;
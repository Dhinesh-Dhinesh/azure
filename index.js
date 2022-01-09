const express = require('express')
const multer = require('multer')
const multerAzure = require('multer-azure')
require('dotenv').config()

const app = express()

// app.use(express.urlencoded({ extended: false })) //for parsing application/x-www-form-urlencoded .For postman
app.use(express.json())



const upload = multer({ 
  storage: multerAzure({
    // connectionString: process.env.CONNECTION_STRING,
    account: 'dhinesh',
    key: process.env.KEY,                   // required connection string or account and key
    container: 'democontainer1',
    blobPathResolver: (req, file, callback) => {
      var blobPath = `folder/${file.originalname}`; //logic for file name
      callback(null, blobPath);
    }
  })
})

app.get('/',(req,res)=>{
  res.send('Hello')
})

app.post('/upload', upload.single("file") , function (req, res, next) {
  console.log(req.file)
  res.status(200).send('done')
  /*In L-31 -> upload.single("file") | the parameter "file" is the name ok key in body of form-data
  Or we can use upload.any() */

  //Don't send multiple response res.status will ends the response automatically < res.end() >
})

app.listen( process.env.PORT || 3000,()=>{
    console.log("server started");
})

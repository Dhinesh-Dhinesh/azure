var express = require('express')
var multer = require('multer')
var multerAzure = require('multer-azure')
 
var app = express()
 
var upload = multer({ 
  storage: multerAzure({
    connectionString: process.env.CONNECTION_STRING,
    account: 'dhinesh',
    key: process.env.KEY,
    container: 'democontainer1'
  })
})

app.get('/',(req,res) => {
  res.send("<h1>Hello</h1>")
})

app.post('/aa', upload.any(), function (req, res, next) {
  console.log(req.files)
  res.send('ok')
//   res.status(200).send('Uploaded: ' + req.files)
})

app.listen( process.env.PORT || 3000,()=>{
    console.log("server started");
})

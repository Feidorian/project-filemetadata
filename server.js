var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname+'/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  const {filename:name,mimetype:type, size} = req.file;
  res.json({name,type,size})
})

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

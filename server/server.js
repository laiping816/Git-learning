let express = require("express");
let app = express();
var fs = require('fs');
var multer  = require('multer');
var cors = require('cors');
let http = require("http");
var Minio = require('minio');


let router = express.Router();
var upload = multer({dest: 'upload_tmp/'});

let minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'topzen123'
});

let name = 'lai';
let policy = {
  Version: '2012-10-17',
  Statement: [
    {
      Sid: 'Public',
      Effect: 'Allow',
      Principal: { AWS: '*' },
      Action: ['s3:GetObject', 's3:GetBucketLocation'],
      Resource: [`arn:aws:s3:::${name}/*`, `arn:aws:s3:::${name}`],
    },
  ],
}


minioClient.setBucketPolicy('lai', JSON.stringify(policy), function(err) {
  if (err) throw err

  console.log('Bucket policy set')
})
var path = require("path");
app.use(cors());

app.use('/we', router.get('/lp', (req, res) => {
	console.log(123);
	 res.sendFile("/Users/laiping/WebProj/Git-learning/server/22.jpg");
	// res.end("req is finish");
}));

app.use('/', router.get('/*', (req, res) => {
	  let objectsStream = minioClient.listObjects('lai', '', true)
	 objectsStream.on('data', function(obj) {
	 	 console.log(obj);
	 	var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'minio/lai' + '/' + obj.name
	 	res.send(publicUrl);
	 });
	// res.end("req is finish");
}));

app.use('/', router.post('/*', (req, res) => {
	upload.single('file')(req, res, err => {
		if(err) {
		return res.status(500).json({
			err_code: 500,
			message: err.message
		})
	}
	let file = req.file.path;
   	var metaData = {
        'Content-Type': 'image/jpeg',
    }
    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject('lai', '主目录/子目录/lp.jpg', file, metaData, function(err, etag) {
      if (err) return console.log(1343442, err)
      console.log('File uploaded successfully.')
  console.log(etag);
  	  });
	   res.send('got it')
	})
	

	// var des_file = "./upload/" + req.files[0].originalname;
	// fs.readFile( req.files[0].path, function (err, data) {
 //         fs.writeFile(des_file, data, function (err) {
 //             if( err ){
 //                 console.log( err );
 //             }else{
 //                 response = {
 //                     message:'File uploaded successfully',
 //                     filename:req.files[0].originalname
 //                 };
 //                 console.log( response );
 //                res.end( JSON.stringify( response ) );
 //             }
 //         });
 //     });
}));

let httpServer = http.createServer(app).listen(1337, function () {
    console.log(`my-server is running on port 1337.`);
});
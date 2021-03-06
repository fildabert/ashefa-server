/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const AWS = require('aws-sdk');
const fs = require('fs');
const streamifier = require('streamifier');

const AWSAccessKeyId = process.env.ACCESS_KEY;
const AWSSecretKey = process.env.SECRET_KEY;

const BUCKET_NAME = 'ashefa-bucket';

const s3 = new AWS.S3({ accessKeyId: AWSAccessKeyId, secretAccessKey: AWSSecretKey });

const uploadFile = (fileName, payload) => new Promise((resolve, reject) => {
  // Read content from the file

  // const fileContent = fs.readFileSync(fileName.buffer, 'utf8');

  const fileContent = streamifier.createReadStream(fileName);

  let s3FileName;

  if (payload) {
    const fileNameDashed = payload.name.split(' ').join('-').toLowerCase();
    s3FileName = `${fileNameDashed}${payload.time.split('T')[0]}_${new Date().getTime()}.${fileContent._object.originalname.split('.')[1]}`;
  }

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: s3FileName || fileContent._object.originalname, // File name you want to save as in S3
    Body: fileContent._object.buffer,
  };

  // Uploading files to the bucket

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      reject(err);
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    resolve(data.Location);
  });
});

module.exports = uploadFile;

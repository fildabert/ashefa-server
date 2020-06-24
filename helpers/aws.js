/* eslint-disable linebreak-style */
const AWS = require('aws-sdk');
const fs = require('fs');
const streamifier = require('streamifier');

const AWSAccessKeyId = 'AKIAIN2VWM2X62BEBURQ';
const AWSSecretKey = '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';

const BUCKET_NAME = 'ashefa-bucket';

const s3 = new AWS.S3({ accessKeyId: AWSAccessKeyId, secretAccessKey: AWSSecretKey });

const uploadFile = (fileName) => new Promise((resolve, reject) => {
  // Read content from the file

  // const fileContent = fs.readFileSync(fileName.buffer, 'utf8');

  const fileContent = streamifier.createReadStream(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileContent._object.originalname, // File name you want to save as in S3
    Body: fileContent._object.buffer,
  };

  // Uploading files to the bucket

  s3.upload(params, (err, data) => {
    if (err) {
      reject(err);
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    resolve(data.Location);
  });
});

module.exports = uploadFile;

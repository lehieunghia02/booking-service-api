const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();


const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const storage = new Storage({
    keyFilename: keyFilePath,
  projectId: process.env.GCP_PROJECT_ID,

});

module.exports = storage;

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const express = require('express');

const app = express();

//!Azure functions
const account = "dhinesh";
const accountKey = process.env.KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

const containerName = 'democontainer1';

async function createContainer(data) {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    var blobName = "video" + new Date().getTime() + ".jpg";
    var filePath = data;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.isServerEncrypted);
}
//!-----------------

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/upload", (req, res) => {
    createContainer(req.body);
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started at port 3000');
})
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const multipart = require('@fastify/multipart');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();
const db = require('./src/models'); 
const pool = require('./src/config/dbConfig'); 

fastify.ready(err => {
  if (err) throw err;
  console.log(fastify.printRoutes());
});

fastify.register(cors, {
  origin: '*',
});

fastify.register(multipart);
fastify.decorate('db', db);
fastify.decorate('pg', pool);

const bookRoutes = require('./src/routes/book');
const bookClubRoutes = require('./src/routes/bookClub');
const userRoutes = require('./src/routes/user');
const readBooks = require('./src/routes/readBooks');
const joinedBookClubs = require('./src/routes/joinedBookClubs');
const commentRoutes = require('./src/routes/comment');

fastify.register(bookRoutes);
fastify.register(bookClubRoutes);
fastify.register(userRoutes);
fastify.register(readBooks);
fastify.register(joinedBookClubs);
fastify.register(commentRoutes);

const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const AZURE_STORAGE_STEELIFY_CONTAINER_NAME = process.env.AZURE_STORAGE_STEELIFY_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`
);

// Azure file upload function
fastify.decorate('uploadFileToAzure', async (fileBuffer, fileName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_STEELIFY_CONTAINER_NAME);
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);
    return blockBlobClient.url;
  } catch (error) {
    fastify.log.error('Error uploading to Azure:', error);
    throw new Error('Failed to upload file to Azure');
  }
});

const start = async () => {
  try {
    await db.sequelize.sync(); // Ensure models are synced with the database
    await fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
    fastify.log.info(`Server is running on port ${process.env.PORT || 3001}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

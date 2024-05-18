const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const movieRouter = require('./routes/movie-router');

const app = express();
const apiPort = 5001;

// Allow all origins with the default CORS configuration
app.use(cors());

// Alternatively, you can explicitly set 'origin' to '*' to allow all origins
// const corsOptions = { origin: '*' };
// app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests for CORS
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Default root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Set up API routes
app.use('/api', movieRouter);

// Start server on specified port
app.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});

const express = require('express');
const dbConnection  = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

dbConnection();
const port = 8000;



app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});

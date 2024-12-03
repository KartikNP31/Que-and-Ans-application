const express = require('express');
const ngrok = require('@ngrok/ngrok');
const dbConnection = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const port = process.env.PORT;
dbConnection();
app.use(cors());

// Webhook handler
app.use('/api/webhooks', bodyParser.raw({ type: 'application/json' }), require('./Routes/webhooks'));


app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({extended: true, limit:"100mb"}));

app.use('/api/user', require('./Routes/UserRoute'));


app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});

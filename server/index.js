const express = require('express');
const ngrok = require('@ngrok/ngrok');
// const { Webhook } = require('svix');
const dbConnection = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

dbConnection();
const port = process.env.PORT;
app.use(cors());
// app.use(bodyParser.raw({ type: 'application/json' }));
// Webhook handler
app.use('/api/webhooks', bodyParser.raw({ type: 'application/json' }), require('./Routes/webhooks'));


app.use(bodyParser.json({ limit: '20mb' }));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({extended: true, limit:"100mb"}));


app.use('/api/user', require('./Routes/UserRoute'));


app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});

// ngrok.connect({ addr: port, authtoken_from_env: true })
//   .then(listener => console.log(`Ingress established at: ${listener.url()}`));
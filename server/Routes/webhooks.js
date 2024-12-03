const express = require('express');
const router = express.Router();
const { Webhook } = require('svix');
const UserActions = require('../Controllers/UserAuth');


router.post('/', async (req, res) => {
  // console.log("🚀 ~ router.post ~ req:", req)
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error('Error: SIGNING_SECRET is missing. Add it to your .env file.');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error. Please check SIGNING_SECRET.',
    });
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headers = req.headers;
  const payload = req.body;

  const svix_id = headers['svix-id'];
  const svix_timestamp = headers['svix-timestamp'];
  const svix_signature = headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: 'Missing required svix headers.',
    });
  }

  let evt;
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return res.status(400).json({
      success: false,
      message: 'Webhook verification failed. Invalid signature.',
    });
  }

  const eventType = evt.type;

  if (eventType === "user.deleted") {
    const userDetails = {
      clerkId: evt.data.id
    }
    const response = await UserActions.deleteUser(userDetails);
    console.log("🚀 ~ router.post ~ response:", response.msg)
    if (response.error) {
      return res.status(500).json(response);
    }
  } else {
    const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
    if (!id || !email_addresses || !username) {
      return res.status(400).json({
        success: false,
        message: 'Error - Username is required or User not created'
      })
    }

    console.log(`Received webhook with ID ${id} and event type: ${eventType}`);

    const userDetails = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username,
      first_name: first_name,
      last_name: last_name,
      image_url: image_url
    }

    if (eventType === "user.created") {
      const response = await UserActions.createUser(userDetails);
      console.log("🚀 ~ router.post ~ response:", response.msg)
      if (response.error) {
        return res.status(500).json(response);
      }
    }
    if (eventType === "user.updated") {
      const response = await UserActions.updateUser(userDetails);
      console.log("🚀 ~ router.post ~ response:", response.msg)
      if (response.error) {
        return res.status(500).json(response);
      }
    }
  }

  return res.status(200).json({
    error: false,
    message: 'Webhook received successfully.',
  });
});




module.exports = router;
const express=require('express');
const UserActions = require('../Controllers/UserActions');
const router=express.Router();



router.post('/newPost', async(req,res) => {
  // console.log("🚀 ~ router.post ~ req:", req.body);
  const response=await UserActions.addPost(req.body);
  	return res.send(response);
	}
);

router.get('/getPosts', async(req,res) => {
  const response=await UserActions.getPost(req);
  return res.send(response);
}
);

router.post('/newComment', async(req,res) => {
  // console.log("🚀 ~ router.post ~ req:", req.body);
  const response=await UserActions.addComment(req.body);
    return res.send(response);
  }
);

router.get('/getComments', async(req,res) => {
  const response=await UserActions.getComments(req);
  	return res.send(response);
  }
);

router.delete('/deletePost', async(req,res) => {
  const response=await UserActions.deletePost(req.body);
  	return res.send(response);
  }
);

router.delete('/deleteComment', async(req,res) => {
  const response=await UserActions.deleteComment(req.body);
  	return res.send(response);
  }
);


router.patch('/updatePost', async(req,res) => {
  const response=await UserActions.updatePost(req.body);
  	return res.send(response);
  }
);


module.exports = router;
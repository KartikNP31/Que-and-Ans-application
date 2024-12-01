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

router.put('/likeComment', async(req,res) => {
  const response=await UserActions.likeComment(req.body);
  	return res.send(response);
  }
);

router.delete('/deletePost/:id', async(req,res) => { 
  const id = req.params.id;
  const response=await UserActions.deletePost(id);
  	return res.send(response);
  }
);

router.delete('/deleteComment/:id', async(req,res) => {
  const id = req.params.id;
  const response=await UserActions.deleteComment(id);
  	return res.send(response);
  }
);


router.put('/updatePost', async(req,res) => {
  const response=await UserActions.updatePost(req.body);
  	return res.send(response);
  }
);

router.put('/approvePost', async(req,res) => {
  const response=await UserActions.approvePost(req.body);
  	return res.send(response);
  }
);


module.exports = router;
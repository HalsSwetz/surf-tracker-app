const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', (req, res) => {
    
    if (req.session.user) {
      
      res.redirect(`/users/${req.session.user._id}/profiles`);
    } else {
      
      res.render('/index');
    }
  });



router.get('/:userId', async (req, res) => {
    try {
        const profile = await User.findById(req.params.userId);
        
        res.render('/profiles/index', {
            profile: profile,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });









module.exports = router;
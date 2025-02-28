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
        
        const profileId = profile._id.toString();
        const canEdit = req.session.user._id === profileId;
        

        res.render('profiles/index', {
            profile: profile,
            waves: profile.waves,
            canEdit: canEdit,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });


  router.get('/:userId/edit', async (req, res) => {
    try {
      const profile = await User.findById(req.params.userId);
      
      res.render('profiles/edit', {
        profile: profile,
        waves: profile.waves,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });



  router.put('/:userId', async (req, res) => {
    try {
        
      await User.findByIdAndUpdate(req.params.userId, req.body);
      
      res.redirect(`/profiles/${req.params.userId}`);

    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });




module.exports = router;
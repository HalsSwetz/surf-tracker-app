const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', (req, res) => {
    // Check if the user is signed in
    if (req.session.user) {
      // Redirect signed-in users to their applications index
      res.redirect(`/users/${req.session.user._id}/profiles`);
    } else {
      // Show the homepage for users who are not signed in
      res.render('index.ejs');
    }
  });



router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        res.render('profiles/index.ejs', {
            user: user,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });









module.exports = router;
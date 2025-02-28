const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', {
            users: users,  
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



  router.get('/:userId', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.userId);
        
        
        res.render('users/show.ejs', {
            foundUser: foundUser,
            waves: foundUser.waves,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });








module.exports = router;
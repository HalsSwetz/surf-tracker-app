const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        
        const waves = currentUser.waves;

        res.render('waves/index.ejs', {
            waves: currentUser.waves,  
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
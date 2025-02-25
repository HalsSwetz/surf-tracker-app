const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Wave = require('../models/user.js');

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

router.get('/new', async (req, res) => {
    res.render('waves/new.ejs');
  });

router.post("/waves", async (req, res) => {
    if (req.body.dangerous === "on") {
        req.body.dangerous = true;
    } else {
        req.body.dangerous = false;
    }
    await Wave.create(req.body);
    res.redirect("/waves");
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        
        currentUser.waves.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/waves`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}); 

router.get('/:waveId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const wave = currentUser.waves.id(req.params.waveId);
        res.render('waves/show.ejs', {
            wave: wave,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });

  router.delete('/:waveId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.waves.id(req.params.waveId).deleteOne();

      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/waves`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:waveId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const wave = currentUser.waves.id(req.params.waveId);
      res.render('waves/edit.ejs', {
        wave: wave,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.put('/:waveId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const wave = currentUser.waves.id(req.params.waveId);
      
      wave.set(req.body);
      await currentUser.save();
      
      res.redirect(
        `/users/${currentUser._id}/waves/${req.params.waveId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });




module.exports = router;
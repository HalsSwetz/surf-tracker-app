const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams needed to access :userId
const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');

    const waves = user.waves || [];
    const isOwner = req.session.user && req.session.user._id === req.params.userId;

    res.render('waves/index.ejs', { waves, isOwner, user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/new', (req, res) => {
  if (!req.session.user || req.session.user._id !== req.params.userId) {
    return res.redirect('/');
  }
  res.render('waves/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    if (!req.session.user || req.session.user._id !== req.params.userId) {
      return res.redirect('/');
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');

    req.body.dangerous = req.body.dangerous === 'on';

    user.waves.push(req.body);
    await user.save();

    res.redirect(`/users/${user._id}/waves`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:waveId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    const wave = user.waves.id(req.params.waveId);
    if (!wave) return res.status(404).send("Wave not found");

    const isOwner = req.session.user && req.session.user._id === req.params.userId;

    res.render('waves/show.ejs', { wave, isOwner });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:waveId/edit', async (req, res) => {
  try {
    if (!req.session.user || req.session.user._id !== req.params.userId) {
      return res.redirect('/');
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');

    const wave = user.waves.id(req.params.waveId);
    if (!wave) return res.redirect(`/users/${user._id}/waves`);

    res.render('waves/edit.ejs', { wave });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.put('/:waveId', async (req, res) => {
  try {
    if (!req.session.user || req.session.user._id !== req.params.userId) {
      return res.redirect('/');
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');

    const wave = user.waves.id(req.params.waveId);
    if (!wave) return res.redirect(`/users/${user._id}/waves`);

    wave.set(req.body);
    await user.save();

    res.redirect(`/users/${user._id}/waves/${wave._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.delete('/:waveId', async (req, res) => {
  try {
    if (!req.session.user || req.session.user._id !== req.params.userId) {
      return res.redirect('/');
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');

    const wave = user.waves.id(req.params.waveId);
    if (!wave) return res.redirect(`/users/${user._id}/waves`);

    wave.deleteOne();
    await user.save();

    res.redirect(`/users/${user._id}/waves`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var userModel = require("./users");
var postModel = require("./posts");
const passport = require('passport');
const upload = require('./multer');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/profile");
};

router.get('/', isNotLoggedIn, function (req, res, next) {
  res.render('index');
});

router.get('/login', isNotLoggedIn, function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  }).populate("posts");
  res.render('profile', { user });
});

router.post('/upload', isLoggedIn, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(404).send('No files were uploaded');
  }

  const user = await userModel.findOne({ username: req.session.passport.user });

  const post = await postModel.create({
    caption: req.body.caption,
    post: req.file.filename,
    user: user._id
  });

  user.posts.push(post._id);
  await user.save();

  res.redirect("/profile");
});

router.post("/register", async (req, res, next) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), (req, res) => { });

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

module.exports = router;

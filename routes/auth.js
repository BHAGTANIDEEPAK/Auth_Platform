// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// router.post('/register', async (req, res) => {
//   const { email, password, projectURL } = req.body;

//   const existing = await User.findOne({ email, projectURL });
//   if (existing) return res.status(400).json({ msg: 'User already exists' });

//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ email, password: hashed, projectURL });

//   const token = jwt.sign({ id: user._id }, JWT_SECRET);
//   res.json({ token, email: user.email });
// });

// router.post('/login', async (req, res) => {
//   const { email, password, projectURL } = req.body;

//   const user = await User.findOne({ email, projectURL });
//   if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, JWT_SECRET);
//   res.json({ token, email: user.email });
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function formatEmail(email, projectURL) {
  const hostname = new URL(`https://${projectURL}`).hostname.replace(/^www\./, '');
  return `${email}@${hostname}`;
}

router.post('/register', async (req, res) => {
  const { email, password, projectURL } = req.body;

  const fullEmail = formatEmail(email, projectURL);
  const existing = await User.findOne({ email: fullEmail });
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email: fullEmail, password: hashed });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password, projectURL } = req.body;

  const fullEmail = formatEmail(email, projectURL);
  const user = await User.findOne({ email: fullEmail });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token, email: user.email });
});

module.exports = router;

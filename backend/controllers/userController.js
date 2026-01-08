// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   const userExists = await User.findOne({ email });
//   if (userExists) return res.status(400).json({ message: 'User already exists' });
//   const user = await User.create({ name, email, password });
//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//     });
//   } else {
//     res.status(400).json({ message: 'Invalid user data' });
//   }
// };

// const authUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt:', { email, password }); // Debug
//   const user = await User.findOne({ email });
//   if (!user) {
//     console.log('User not found:', email);
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }
//   const isMatch = await user.matchPassword(password);
//   console.log('Password match:', isMatch); // Debug
//   if (isMatch) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//     });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// };

// const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// };

// module.exports = { registerUser, authUser, getUserProfile };
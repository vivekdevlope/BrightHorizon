const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../backend/utils/generateToken');

dotenv.config();
connectDB();

const app = express();



// app.options("*", cors());
// app.options('/*', cors());


const allowedOrigins = [
  "http://localhost:5173",
  "https://bright-horizon.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 👇 MUST exist for Render health check
app.get('/', (req, res) => {
  res.send('Backend is running on Render 🚀');
});


// Temporary admin setup route
// app.post('/api/setup-admin', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log('Creating admin with hashed password:', hashedPassword); // Debug
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'admin',
//     });
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/uploads', express.static('uploads'));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
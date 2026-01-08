// backend/routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const Enquiry = require('../models/enquiryModel');
const { protect, admin } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');

// ====== POST /api/enquiries (Public) ======
router.post('/', async (req, res) => {
  try {
    console.log('Received enquiry data:', req.body);

    // [FIXED] Destructured all fields from the form and model
    const { fullName, email, company, interestedIn, message } = req.body;

    // [FIXED] Validation now matches the Mongoose model
    if (!fullName || !email || !company || !interestedIn || !message) {
      return res
        .status(400)
        .json({ message: 'All fields are required' });
    }

    // ✅ Save to database (using correct field names)
    const enquiry = new Enquiry({
      fullName,
      email,
      company,
      interestedIn,
      message,
    });

    await enquiry.save();
    console.log('✅ Enquiry saved successfully:', enquiry);

    // --- Optional: Send notification email to admin ---
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER, // set in .env
          pass: process.env.SMTP_PASS, // set in .env
        },
      });

      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER || process.env.SMTP_USER,
        subject: `New Enquiry from ${fullName}`, // [FIXED] Use fullName
        text: `Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\nInterested In: ${interestedIn}\nMessage: ${message}`, // [FIXED] Use fullName
      });

      console.log('📧 Enquiry email sent successfully');
    } catch (emailErr) {
      console.warn('⚠️ Email not sent:', emailErr.message);
    }

    res.status(201).json({ message: 'Enquiry saved successfully!' });
  } catch (err) {
    console.error('❌ Enquiry save error:', err);
    // [FIXED] Send back the specific validation error if one occurs
    res.status(400).json({ message: err.message || 'Server error' });
  }
});

// [FIXED] You need a GET route for your admin panel to work
// This was missing from your file but present in 'enquiryController.js'
router.get('/', protect, admin, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    // [FIXED] Send back in a structure your admin page expects
    res.status(200).json({ enquiries: enquiries }); 
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// [FIXED] You need a DELETE route for your admin panel to work
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (enquiry) {
      await enquiry.deleteOne(); // Use deleteOne()
      res.json({ message: 'Enquiry removed' });
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
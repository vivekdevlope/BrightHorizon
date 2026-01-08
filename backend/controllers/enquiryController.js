const Enquiry = require('../models/enquiryModel');

// @desc   Create a new enquiry from contact form
// @route  POST /api/enquiry
// @access Public
const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, company, interestedIn, message } = req.body;

    // Basic validation
    if (!fullName || !email || !company || !interestedIn || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const enquiry = new Enquiry({
      fullName,
      email,
      company,
      interestedIn,
      message,
    });

    const createdEnquiry = await enquiry.save();
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      enquiry: createdEnquiry,
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc   Get all enquiries
// @route  GET /api/enquiry
// @access Admin (optional)
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createEnquiry, getEnquiries };

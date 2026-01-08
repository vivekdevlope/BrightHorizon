// Admin-specific, but since admin is a user role, can merge if needed. Placeholder for now.
const authUser = require('./userController').authUser; // Reuse user login for admin

module.exports = { adminLogin: authUser }; // Admin logs in same way, role checked in middleware
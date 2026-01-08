const bcrypt = require('bcryptjs');

const plainPassword = 'admin123';

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('New hash for admin123:', hash);
});
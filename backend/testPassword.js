const bcrypt = require('bcryptjs');

const hashedPassword = '$2b$10$IU4Er4lOG/oAC9lqfy0WSudsaUI/ZBO4BKn6mkAO8WycGJX97/bzS'; // Replace with the new hash
const plainPassword = 'admin123';

bcrypt.compare(plainPassword, hashedPassword).then(match => {
  console.log('Password match:', match); // Should log true
});
require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

async function createAdmin() {
  console.log('🔄 Creating admin user...');
  
  const email = 'roaa@gmail.com';
  const name = 'Roaa';
  const plainPassword = 'roro';  
  
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('✅ Password hashed');

    // Delete if admin already exists
    await new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE email = ?', [email], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Old admin deleted (if existed)');

    // Inserting new admin
    db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'admin'],
      (err, result) => {
        if (err) {
          console.error('❌ Error:', err);
          process.exit(1);
        }
        console.log('🎉 ADMIN CREATED SUCCESSFULLY!');
        console.log('📧 Email: roaa@gmail.com');
        console.log('🔑 Password: roro');
        console.log('🆔 ID:', result.insertId);
        process.exit(0);
      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();

const db = require('../db');
const session = require('../session');
const readline = require('readline');

module.exports = async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise(res => rl.question(q, res));

  const id = await ask('Masukkan ID akun: ');
  const pin = await ask('Masukkan PIN: ');

  const [rows] = await db.execute('SELECT * FROM accounts WHERE id = ? AND pin = ?', [id, pin]);
  rl.close();

  if (rows.length === 0) {
    console.log('❌ Login gagal.');
  } else {
    session.saveSession(rows[0]);
    console.log(`✅ Login berhasil. Selamat datang, ${rows[0].name}!`);
  }
};

const db = require('../db');
const readline = require('readline');

module.exports = async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise(resolve => rl.question(q, resolve));

  const name = await ask('Masukkan nama: ');
  const pin = await ask('Masukkan PIN (angka): ');
  rl.close();

  if (!name || !pin) {
    console.log('❌ Nama dan PIN wajib diisi.');
    return;
  }

  const [result] = await db.execute(
    'INSERT INTO accounts (name, pin) VALUES (?, ?)', [name, pin]
  );

  console.log(`✅ Akun berhasil dibuat. ID akun Anda: ${result.insertId}`);
};

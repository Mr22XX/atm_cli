const db = require('../db');
const session = require('../session');

module.exports = async (options) => {
  const user = session.getSession();
  if (!user) return console.log('❌ Harus login dulu.');

  const amount = parseFloat(options.amount);
  if (isNaN(amount) || amount <= 0) return console.log('❌ Jumlah tidak valid.');

  const newBalance = Number(user.balance) + amount;

  await db.execute('UPDATE accounts SET balance = ? WHERE id = ?', [newBalance, user.id]);
  await db.execute('INSERT INTO transactions (account_id, type, amount, created_at) VALUES (?, "deposit", ?, NOW())', [user.id, amount]);

  user.balance = newBalance;
  session.saveSession(user);

  console.log(`✅ Setor berhasil. Saldo baru: Rp ${newBalance.toFixed(2)}`);
};

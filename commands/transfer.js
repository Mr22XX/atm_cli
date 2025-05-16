const db = require('../db');
const session = require('../session');

module.exports = async (options) => {
  const user = session.getSession();
  if (!user) return console.log('❌ Harus login dulu.');

  const amount = parseFloat(options.amount);
  const targetId = parseInt(options.to);

  if (isNaN(amount) || amount <= 0) return console.log('❌ Jumlah tidak valid.');
  if (isNaN(targetId)) return console.log('❌ ID akun tujuan tidak valid.');
  if (user.id === targetId) return console.log('❌ Tidak bisa transfer ke akun sendiri.');
  if (user.balance < amount) return console.log('❌ Saldo tidak cukup.');

  const [targetRows] = await db.execute('SELECT * FROM accounts WHERE id = ?', [targetId]);
  if (targetRows.length === 0) return console.log('❌ Akun tujuan tidak ditemukan.');

  const newSenderBalance = user.balance - amount;
  const newReceiverBalance = Number(targetRows[0].balance) + amount;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.execute('UPDATE accounts SET balance = ? WHERE id = ?', [newSenderBalance, user.id]);
    await conn.execute('UPDATE accounts SET balance = ? WHERE id = ?', [newReceiverBalance, targetId]);

    await conn.execute('INSERT INTO transactions (account_id, type, amount, target_id, created_at) VALUES (?, "transfer_out", ?, ?, NOW())', [user.id, amount, targetId]);
    await conn.execute('INSERT INTO transactions (account_id, type, amount, target_id, created_at) VALUES (?, "transfer_in", ?, ?, NOW())', [targetId, amount, user.id]);

    await conn.commit();
    user.balance = newSenderBalance;
    session.saveSession(user);
    console.log(`✅ Transfer berhasil ke akun ${targetId}. Saldo baru: Rp ${newSenderBalance.toFixed(2)}`);
  } catch (e) {
    await conn.rollback();
    console.log('❌ Gagal transfer:', e.message);
  } finally {
    conn.release();
  }
};

const session = require('../session');

module.exports = () => {
  const user = session.getSession();
  if (!user) return console.log('❌ Harus login terlebih dahulu.');

  console.log(`💰 Saldo Anda saat ini: Rp ${Number(user.balance).toFixed(2)}`);
};

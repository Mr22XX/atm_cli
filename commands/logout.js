const session = require('../session');

module.exports = () => {
  session.clearSession();
  console.log('🔒 Logout berhasil.');
};

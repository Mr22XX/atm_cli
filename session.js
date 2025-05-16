const fs = require('fs');
const path = './session.json';

function saveSession(user) {
  fs.writeFileSync(path, JSON.stringify(user));
}

function getSession() {
  if (!fs.existsSync(path)) return null;
  const raw = fs.readFileSync(path);
  return JSON.parse(raw);
}

function clearSession() {
  if (fs.existsSync(path)) fs.unlinkSync(path);
}

module.exports = { saveSession, getSession, clearSession };

const { program } = require('commander');

// Import perintah
const register = require('./commands/register');
const login = require('./commands/login');
const logout = require('./commands/logout');
const checkBalance = require('./commands/checkBalance');
const deposit = require('./commands/deposit');
const withdraw = require('./commands/withdraw');
const transfer = require('./commands/transfer');

program.command('register').description('Daftar akun baru').action(register);
program.command('login').description('Login ke akun').action(login);
program.command('logout').description('Logout dari akun').action(logout);
program.command('check-balance').description('Cek saldo').action(checkBalance);
program.command('deposit').description('Setor uang').option('--amount <amount>', 'Jumlah').action(deposit);
program.command('withdraw').description('Tarik uang').option('--amount <amount>', 'Jumlah').action(withdraw);
program.command('transfer').description('Transfer ke akun lain').option('--to <id>', 'ID akun tujuan').option('--amount <amount>', 'Jumlah').action(transfer);

program.parse();

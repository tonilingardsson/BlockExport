// Access to the button #accountNumber
const accountInput = document.querySelector('#accountNumber');
// Access to the button #checkBalance
const checkBalanceBtn = document.querySelector('#checkBalance');
// Access to the div #balance
const balanceDiv = document.querySelector('#balance');
// To use Ganache, create a variable and set it to endpoint 'http://127.0.0.1:7545'
const rpc = new Web3('http://127.0.0.1:7545');

function initApp () {
console.log(rpc);
}

document.addEventListener('DOMContentLoaded', initApp)
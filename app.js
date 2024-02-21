// Access to the button #accountNumber
const accountInput = document.querySelector('#accountNumber');
// Access to the button #checkBalance
const checkBalanceButton = document.querySelector('#checkBalance');
// Access to the div #balance
const displayBalance = document.querySelector('#balance');


// To use Ganache, create a variable and set it to endpoint 'http://127.0.0.1:7545'
const rpc = new Web3('http://127.0.0.1:7545');

// Set a let variable for account
let account;

function initApp () {
console.log(rpc);
}

async function checkBalance () {
    account = accountInput.value;
    // Get the balance of the account. Async! We need to await. Rpc from web3.js is an Eth library
    const balance = await rpc.eth.getBalance(account);
    // Display the balance
    displayBalance.innerHTML = rpc.utils.fromWei(balance, 'ether');

}

document.addEventListener('DOMContentLoaded', initApp)
// Connect an eventListener to the button #checkBalance
checkBalanceButton.addEventListener('click', checkBalance);
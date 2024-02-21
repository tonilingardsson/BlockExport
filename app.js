// Access to the button #accountNumber
const accountInput = document.querySelector('#accountNumber');
// Access to the button #checkBalance
const checkBalanceButton = document.querySelector('#checkBalance');
// Access to the div #balance
const displayBalance = document.querySelector('#balance');
// Access to the button #toAccountNumber
const toAccountInput = document.querySelector('#toAccountNumber');
// Access to the button #amount
const valueInput = document.querySelector('#amount');
// Access to the button #transfer
const sendButton = document.querySelector('#sendTx');


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

async function sendTransaction () {
    // Fetch the account to sent the transaction
    const toAddress = toAccountInput.value;
    // Fetch the value (calling the var amount so it defers from value)
    const amount = valueInput.value;
    // Send the transaction
    try {
        // Create the object to be sent. 
        // Documentation: https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction
        const trx = await rpc.eth.sendTransaction(
            // The transaction object:
            {
            from: account,
            to: toAddress,
            // Convert the amount to ether
            value: rpc.utils.toWei(amount, 'ether'),
            // gas: 21000
            
        });
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', initApp)
// Connect an eventListener to the button #checkBalance
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);
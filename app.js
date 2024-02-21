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
// Prepare to display the transactions information
const transactionList = document.querySelector('#transactions');


// To use Ganache, create a variable and set it to endpoint 'http://127.0.0.1:7545'
// const rpc = new Web3('http://127.0.0.1:7545');
// To use Sepolia testnet, create a variable and set it to endpoint 'https://rpc.sepolia.org'
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

    // Get the lastest block. You can choose 'earliest', 'latest', 'pending', "safe", or "finalized"
    // Documentation: https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#getblock
    const block = await rpc.eth.getBlock('latest');

    // Display the block
    console.log(block);

    // Display the block number
    if(block === null) return;
    const transactions = block.transactions;
    if(block !== null) {
        // If the transaction is not null, display it.
        displayHistory(transactions);
    }
}

async function displayHistory (transactions) {
    // Clear the list from other accounts
    transactionList.innerHTML = '';
    // Run the loop for each transaction
    for(let hash of transactions) {
        // Get the transaction details. Documentation: https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#gettransaction
        let trx = await rpc.eth.getTransaction(hash);
        // Call the function sendTransaction (below) to display the information
        createTranstactionList(trx);
    }
}

// Display information about transactions of this account
function createTranstactionList (transaction) {
    transactionList.innerHTML += `
        <span>${transaction.from}</span>
        <span>${transaction.to}</span>
        <span>${rpc.utils.fromWei(transaction.value, 'ether')} ETH</span>
    `
}

// This funtions takes nowadays between 8 and 15 minutes in the Ethereum network
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
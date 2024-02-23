// Connect wallet
const connectWalletButton = document.querySelector('#connectWallet');

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

const displayLatestBlock = document.querySelector('#latestBlock');


// To use Ganache, create a variable and set it to endpoint 'http://127.0.0.1:7545'
// const rpc = new Web3('http://127.0.0.1:7545');
// To use Sepolia testnet, create a variable and set it to endpoint 'https://rpc.sepolia.org'
// const rpc = new Web3('https://eth-sepolia.g.alchemy.com/v2/0hsv8CFMaujxb8hnFk2_gZ2irlAizVK2');


// Set a let variable for account
let account;

async function connectWallet () {
    // Request an account
    if(typeof window.ethereum !== 'undefined') {
        // Check if MetaMask is installed, having access to Ethereum network
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });    
    }
    else {
        alert('Please install MetaMask extension to your browser');
    }
}


function initApp () {

}

async function checkBalance () {
    account = accountInput.value;
    // Get the balance of the account. Async! We need to await. Rpc from web3.js is an Eth library
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
    const formattedBalance = parseInt(balance) / Math.pow(10, 18);
    // Display the balance
    displayBalance.innerHTML = formattedBalance + ' ETH';

    // Get the lastest block. You can choose 'earliest', 'latest', 'pending', "safe", or "finalized"
   
}

async function displayHistory (transactions) {
    // Clear the list from other accounts
    transactionList.innerHTML = '';
    // Run the loop for each transaction
    for(let hash of transactions) {
        // Get the transaction details. Documentation: https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#gettransaction
        let trx = await rpc.eth.getTransaction(hash);
        // Call the function sendTransaction (below) to display the information
        await createTranstactionList(trx);
    }
}

// Display information about transactions of this account
async function createTranstactionList (transaction) {
    transactionList.innerHTML += `
        <span>${transaction.from}</span>
        <span>${transaction.to}</span>
        <span>${await rpc.utils.fromWei(transaction.value, 'ether')} ETH</span>
    `
}

// This funtions takes nowadays between 8 and 15 minutes in the Ethereum network
async function sendTransaction () {
    // Fetch the account to sent the transaction
    const toAddress = toAccountInput.value;
    // Fetch the value (calling the var amount so it defers from value)
    const amount = valueInput.value;
    // Convert the amount to wei, the standart value for the transaction on the Ethereum network
    const transactionAmount = parseFloat(amount) * Math.pow(10, 18);


    // Send the transaction
    try {
        // Create the object to be sent. 
        // Documentation: https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction
        const trx = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: account,
                to: toAddress,
                // Convert the amount to ether
                value: Number(transactionAmount).toString(16),
                gas: Number(21000).toString(16),
                gasPrice: Number(20000000).toString(16)

            }]
        });
           
    } catch (error) {
        console.log(error);
    }
}

const lastestBlock = await window.ethereum.request({
    "method": "eth_blockNumber",
  });

  displayLatestBlock.innerHTML = parseInt(lastestBlock);

// Get the lastest block and look for our transaction. However, it may happen another transaction in the meantime.
//   const getBlockByNumber = await window.ethereum.request({
//     "method": "eth_getBlockByNumber",
//     "params": [
//       lastestBlock,
//       true
//     ]
//   });
// console.log(getBlockByNumber);

document.addEventListener('DOMContentLoaded', initApp)
// Connect an eventListener to the button #connectWallet
connectWalletButton.addEventListener('click', connectWallet);
// Connect an eventListener to the button #checkBalance
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);

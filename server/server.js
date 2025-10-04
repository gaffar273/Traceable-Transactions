const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
require('dotenv').config();
const contractABI = require('./build/TraceableTransactions.json');
const apiRouter = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet); 


let contractWithSigner = contract;
if (privateKey) {
  const wallet = new ethers.Wallet(privateKey, provider);
  contractWithSigner = contract.connect(wallet);
}


app.use('/api',apiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

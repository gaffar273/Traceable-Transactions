const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const contractABI = require('../build/TraceableTransactions.json');


const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Connect to blockchain
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const apiRouter = express.Router();


// Get the owner address
apiRouter.get('/owner', async (req, res) => {
  try {
    const owner = await contract.owner();
    res.json({ owner: owner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get the investigator address
apiRouter.get('/investigator', async (req, res) => {
  try {
    const investigator = await contract.investigator();
    res.json({ investigator: investigator });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get total number of transactions
apiRouter.get('/total', async (req, res) => {
  try {
    const total = await contract.getTotalTransactions();
    res.json({ 
      total: total.toString(),
      message: `Total transactions: ${total.toString()}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one transaction by ID
apiRouter.get('/transaction/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const tx = await contract.getTransaction(id);
    
    res.json({
      id: id,
      sender: tx.sender,
      receiver: tx.receiver,
      amount: ethers.utils.formatEther(tx.amount) + ' ETH',
      time: new Date(tx.time.toNumber() * 1000).toLocaleString(),
      suspicious: tx.suspicious,
      note: tx.note
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
apiRouter.get('/all-transactions', async (req, res) => {
  try {
    const total = await contract.getTotalTransactions();
    const allTx = [];
    
    for (let i = 0; i < total; i++) {
      const tx = await contract.getTransaction(i);
      allTx.push({
        id: i.toString(),
        sender: tx.sender,
        receiver: tx.receiver,
        amount: ethers.utils.formatEther(tx.amount) + ' ETH',
        time: new Date(tx.time.toNumber() * 1000).toLocaleString(),
        suspicious: tx.suspicious,
        note: tx.note
      });
    }
    
    res.json({ 
      count: allTx.length,
      transactions: allTx 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions for a wallet address
apiRouter.get('/user-transactions/:address', async (req, res) => {
  try {
    const userAddress = req.params.address;
    const txIds = await contract.getUserTransactions(userAddress);
    
    const userTxs = [];
    for (let id of txIds) {
      const tx = await contract.getTransaction(id.toString());
      userTxs.push({
        id: id.toString(),
        sender: tx.sender,
        receiver: tx.receiver,
        amount: ethers.utils.formatEther(tx.amount) + ' ETH',
        time: new Date(tx.time.toNumber() * 1000).toLocaleString(),
        suspicious: tx.suspicious,
        note: tx.note
      });
    }
    
    res.json({ 
      user: userAddress,
      count: userTxs.length,
      transactions: userTxs 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get real name 
apiRouter.get('/user-name/:address', async (req, res) => {
  try {
    const userAddress = req.params.address;
    const name = await contract.realName(userAddress);
    
    res.json({ 
      address: userAddress,
      name: name ? name : 'No name saved'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Trace where money went from an address
apiRouter.get('/trace/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const result = await contract.traceFlow(address);
    
    const txIds = result[0];
    const froms = result[1];
    const tos = result[2];
    
    if (txIds.length === 0) {
      return res.json({
        address: address,
        flow: 'No transactions found'
      });
    }
    
    const flowPath = txIds.map((id, i) => ({
      txId: id.toString(),
      from: froms[i],
      to: tos[i]
    }));
    
    res.json({
      address: address,
      flowPath: flowPath
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check for loop
apiRouter.get('/check-loops/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const hasLoop = await contract.checkLoop(address);
    
    res.json({ 
      address: address,
      hasLoop: hasLoop
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 


// Get all suspicious transactions
apiRouter.get('/suspicious-transactions', async (req, res) => {
  try {
    const suspiciousIds = await contract.getSuspiciousTransactions();
    
    const suspiciousTxs = [];
    for (let id of suspiciousIds) {
      const tx = await contract.getTransaction(id.toString());
      suspiciousTxs.push({
        id: id.toString(),
        sender: tx.sender,
        receiver: tx.receiver,
        amount: ethers.utils.formatEther(tx.amount) + ' ETH',
        time: new Date(tx.time.toNumber() * 1000).toLocaleString(),
        suspicious: tx.suspicious,
        reason: tx.note
      });
    }
    
    res.json({ 
      count: suspiciousTxs.length,
      transactions: suspiciousTxs 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Add a new transaction
apiRouter.post('/add-transaction', async (req, res) => {
  try {
    const { sender, receiver, amount } = req.body;
    
    if (!sender || !receiver || !amount ) {
      return res.status(400).json({ 
        error: 'Please provide sender, receiver, and amount' 
      })
      
    }else if (sender.trim().toLowerCase() === receiver.trim().toLowerCase()) {
      return res.status(400).json({ 
        error: 'Sender and receiver cannot be the same address' 
      });
    }
    
    const amountInWei = ethers.utils.parseEther(amount.toString());
    
    const tx = await contract.recordTransaction(sender, receiver, amountInWei);
    await tx.wait(); 
    
    res.json({ 
      success: true,
      message: 'Transaction recorded!',
      txHash: tx.hash
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Flag a transaction as suspicious
apiRouter.post('/flag-transaction', async (req, res) => {
  try {
    const { id, reason } = req.body;

    if (!id || !reason) {
      return res.status(400).json({ 
        error: 'Please provide transaction id and reason' 
      });
    }
    
    const tx = await contract.flagTransaction(id, reason);
    await tx.wait();
    
    res.json({ 
      success: true,
      message: 'Transaction flagged as suspicious!',
      txHash: tx.hash
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save a real name for an address
apiRouter.post('/save-name', async (req, res) => {
  try {
    const { address, name } = req.body;
    
    if (!address || !name) {
      return res.status(400).json({ 
        error: 'Please provide address and name' 
      });
    }
    
    const tx = await contract.saveRealName(address, name);
    await tx.wait();
    
    res.json({ 
      success: true,
      message: 'Name saved successfully!',
      txHash: tx.hash
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get contract info
apiRouter.get('/contract-info', async (req, res) => {
  try {
    const owner = await contract.owner();
    const investigator = await contract.investigator();
    const total = await contract.getTotalTransactions();
    
    res.json({
      contractAddress: contractAddress,
      owner: owner,
      investigator: investigator,
      totalTransactions: total.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple health check
apiRouter.get('/status', async (req, res) => {
  try {
    const blockNumber = await provider.getBlockNumber();
    res.json({ 
      status: 'Server is running!',
      blockchain: 'Connected',
      currentBlock: blockNumber
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error',
      error: error.message 
    });
  }
});

module.exports = apiRouter;
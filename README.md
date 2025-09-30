# TraceableTransactions DApp

A **full-stack blockchain application (DApp)** to track, trace, and flag transactions for fraud investigation.  
Built with **Solidity**, deployed on **Sepolia Testnet**, and integrated with a **MERN + Ethers.js** frontend.  

Live Demo: [https://traceable-transactions.vercel.app/](https://traceable-transactions.vercel.app/)

---

## 🔹 Features

### Smart Contract Features
- **Record Transactions**: Store sender, receiver, amount, timestamp, and optional notes.  
- **Trace Transaction Flow**: Track where money went starting from any address.  
- **Flag Suspicious Transactions**: Investigators can mark transactions as suspicious with reasons.  
- **Get Suspicious Transactions**: Retrieve all flagged transactions.  
- **KYC Support**: Save real names for addresses.  
- **Loop Detection**: Detect if funds flow back to the same address.  
- **Query Functions**:  
  - Get details of a single transaction  
  - Get all transactions for a user  
  - Get total number of transactions  

---

## 🛠️ Tech Stack

- **Smart Contract**: Solidity, deployed on Sepolia Testnet using Remix IDE  
- **Blockchain Interaction**: Ethers.js  
- **Backend**: Node.js + Express.js  
- **Frontend**: React.js  
- **Database**: (Optional if used, mention MongoDB)  

---

## 🛠️ Functions Overview

| Function | Description | Access |
|----------|-------------|--------|
| `recordTransaction` | Record a new transaction | Owner only |
| `getTransaction` | Get details of a transaction by ID | Public |
| `getUserTransactions` | List all transaction IDs of a user | Public |
| `traceFlow` | Trace the flow of funds from an address | Public |
| `flagTransaction` | Mark a transaction as suspicious | Investigator only |
| `getSuspiciousTransactions` | List all suspicious transactions | Public |
| `saveRealName` | Save real name of a user (KYC) | Owner only |
| `checkLoop` | Detect loops in transactions | Public |
| `getTotalTransactions` | Get total number of transactions | Public |

---

## 📌 Notes

- **Owner**: Deployer of the contract, can record transactions and save KYC data.  
- **Investigator**: Can flag suspicious transactions. Initially, the deployer is both owner and investigator.  
- All transactions are stored in an array and mapped to users for easy tracking.  
- Frontend fully integrates all smart contract features using **Ethers.js** and a responsive UI.  

---


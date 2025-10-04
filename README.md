# TraceableTransactions DApp

A **full-stack blockchain application (DApp)** to track, trace, and flag transactions for fraud investigation.  
Built with **Solidity**, deployed on **Sepolia Testnet**, and integrated with a **MERN + Ethers.js**.

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








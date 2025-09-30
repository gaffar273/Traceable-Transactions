import axios from "axios";
import { parseEther, formatEther } from "ethers";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;
// const backendURL = "http://localhost:4000";

export const resContext = createContext();

export const ResProvider = ({ children }) => {
    const [owner, setOwner] = useState(null);
    const [investigator, setInvestigator] = useState(null);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [allTransactions, setAllTransactions] = useState([]);
    const [suspiciousTransactions, setSuspiciousTransactions] = useState([]);
    const [userTransactions, setUserTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch owner address
    const fetchOwner = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/owner`);
            if (data.owner) {
                setOwner(data.owner);
                toast.success("Owner fetched successfully");
            }
        } catch (err) {
            toast.error("Error fetching owner");
            console.error(err);
        }
    };

    // Fetch investigator address
    const fetchInvestigator = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/investigator`);
            if (data.investigator) {
                setInvestigator(data.investigator);
                toast.success("Investigator fetched successfully");
            }
        } catch (err) {
            toast.error("Error fetching investigator");
            console.error(err);
        }
    };

    // Fetch total number of transactions
    const fetchTotalTransactions = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/total`);
            if (data.total) {
                setTotalTransactions(data.total);
                toast.success(data.message);
            }
        } catch (err) {
            toast.error("Error fetching total transactions");
            console.error(err);
        }
    };

    // Fetch a single transaction by ID
    const fetchTransactionById = async (id) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/transaction/${id}`);
            toast.success("Transaction fetched successfully");
            return data;
        } catch (err) {
            toast.error("Error fetching transaction");
            console.error(err);
            return null;
        }
    };

    // Fetch all transactions
    const fetchAllTransactions = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendURL}/api/all-transactions`);
            if (data.transactions) {
                setAllTransactions(data.transactions);
                toast.success(`Fetched ${data.count} transactions`);
            }
        } catch (err) {
            toast.error("Error fetching all transactions");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch transactions for a specific user
    const fetchUserTransactions = async (address) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendURL}/api/user-transactions/${address}`);
            if (data.transactions) {
                setUserTransactions(data.transactions);
                toast.success(`Fetched ${data.count} transactions for user`);
                return data;
            }
        } catch (err) {
            toast.error("Error fetching user transactions");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Fetch user's real name
    const fetchUserName = async (address) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user-name/${address}`);
            return data;
        } catch (err) {
            toast.error("Error fetching user name");
            console.error(err);
            return null;
        }
    };

    // Trace money flow from an address
    const traceMoneyFlow = async (address) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/trace/${address}`);
            toast.success("Money flow traced successfully");
            return data;
        } catch (err) {
            toast.error("Error tracing money flow");
            console.error(err);
            return null;
        }
    };

    // Check for transaction loops
    const checkLoops = async (address) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/check-loops/${address}`);
            toast.success("Loop check completed");
            return data;
        } catch (err) {
            toast.error("Error checking loops");
            console.error(err);
            return null;
        }
    };

    // Fetch all suspicious transactions
    const fetchSuspiciousTransactions = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendURL}/api/suspicious-transactions`);
            if (data.transactions) {
                setSuspiciousTransactions(data.transactions);
                toast.success(`Fetched ${data.count} suspicious transactions`);
            }
        } catch (err) {
            toast.error("Error fetching suspicious transactions");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add a new transaction
    const addTransaction = async (sender, receiver, amount) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${backendURL}/api/add-transaction`, {
                sender,
                receiver,
                amount
            });
            if (data.success) {
                toast.success(data.message);
                // Refresh transactions after adding
                await fetchAllTransactions();
                return data;
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Error adding transaction");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Flag a transaction as suspicious
    const flagTransaction = async (id, reason) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${backendURL}/api/flag-transaction`, {
                id,
                reason
            });
            if (data.success) {
                toast.success(data.message);
                // Refresh suspicious transactions after flagging
                await fetchSuspiciousTransactions();
                return data;
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Error flagging transaction");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Save a real name for an address
    const saveUserName = async (address, name) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${backendURL}/api/save-name`, {
                address,
                name
            });
            if (data.success) {
                toast.success(data.message);
                return data;
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Error saving name");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Check balance of any address
    const checkBalance = async (address) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/balance/${address}`);
            toast.success("Balance fetched successfully");
            return data;
        } catch (err) {
            toast.error("Error fetching balance");
            console.error(err);
            return null;
        }
    };

    // Get contract info
    const fetchContractInfo = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/contract-info`);
            setOwner(data.owner);
            setInvestigator(data.investigator);
            setTotalTransactions(data.totalTransactions);
            toast.success("Contract info fetched successfully");
            return data;
        } catch (err) {
            toast.error("Error fetching contract info");
            console.error(err);
            return null;
        }
    };

    // Check server status
    const checkStatus = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/status`);
            return data;
        } catch (err) {
            toast.error("Server is not responding");
            console.error(err);
            return null;
        }
    };

    const values = {
        // State
        owner,
        investigator,
        totalTransactions,
        allTransactions,
        suspiciousTransactions,
        userTransactions,
        loading,
        
        // Setters
        setOwner,
        setInvestigator,
        setTotalTransactions,
        setAllTransactions,
        setSuspiciousTransactions,
        setUserTransactions,
        
        // GET methods
        fetchOwner,
        fetchInvestigator,
        fetchTotalTransactions,
        fetchTransactionById,
        fetchAllTransactions,
        fetchUserTransactions,
        fetchUserName,
        traceMoneyFlow,
        checkLoops,
        fetchSuspiciousTransactions,
        checkBalance,
        fetchContractInfo,
        checkStatus,
        
        // POST methods
        addTransaction,
        flagTransaction,
        saveUserName,
    };

    return <resContext.Provider value={values}>{children}</resContext.Provider>;
};
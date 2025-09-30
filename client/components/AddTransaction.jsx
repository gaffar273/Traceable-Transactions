import React from "react";
import toast from "react-hot-toast";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function AddTransaction() {
  const { addTransaction, loading } = useContext(resContext);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleSubmit = async () => {
    if (!sender || !receiver || !amount) return;
    if (sender.trim().toLowerCase() === receiver.trim().toLowerCase()) {
      toast.error("Sender and receiver cannot be the same address.");
      return;
    }
    await addTransaction(sender, receiver, amount);
    setSender("");
    setReceiver("");
    setAmount("");
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Transaction</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Sender Address"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="0.001"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </div>
    </div>
  );
}
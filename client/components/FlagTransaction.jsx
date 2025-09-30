import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function FlagTransaction() {
  const { flagTransaction, loading } = useContext(resContext);
  const [txId, setTxId] = useState("");
  const [reason, setReason] = useState("");
  
  const handleSubmit = async () => {
    if (!txId || !reason) return;
    await flagTransaction(txId, reason);
    setTxId("");
    setReason("");
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Flag Transaction</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Transaction ID"
          value={txId}
          onChange={(e) => setTxId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Flagging..." : "Flag as Suspicious"}
        </button>
      </div>
    </div>
  );
}
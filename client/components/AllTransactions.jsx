import React, { useContext } from "react";
import { resContext } from "../hooks/controller";


export function AllTransactions() {
  const { allTransactions, fetchAllTransactions, loading } = useContext(resContext);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Transactions</h2>
      <button
        onClick={fetchAllTransactions}
        disabled={loading}
        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch All Transactions"}
      </button>
      
      {allTransactions.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receiver</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 w-full">
              {allTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{tx.id}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 truncate max-w-xs">{tx.sender}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 truncate max-w-xs">{tx.receiver}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{tx.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{tx.time}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tx.suspicious ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}>
                      {tx.suspicious ? "Suspicious" : "Normal"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

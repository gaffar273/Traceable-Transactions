import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function SuspiciousTransactions() {
  const { suspiciousTransactions, fetchSuspiciousTransactions, loading } = useContext(resContext);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Suspicious Transactions</h2>
      <button
        onClick={fetchSuspiciousTransactions}
        disabled={loading}
        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch Suspicious Transactions"}
      </button>
      
      {suspiciousTransactions.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receiver</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suspiciousTransactions.map((tx) => (
                <tr key={tx.id} className="bg-red-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{tx.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{tx.sender}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{tx.receiver}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{tx.amount}</td>
                  <td className="px-4 py-3 text-sm text-red-600">{tx.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function UserTransactions() {
  const { fetchUserTransactions, loading } = useContext(resContext);
  const [address, setAddress] = useState("");
  const [userTxs, setUserTxs] = useState([]);
  
  const handleFetch = async () => {
    if (!address) return;
    const data = await fetchUserTransactions(address);
    if (data) setUserTxs(data.transactions);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Transactions</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter User Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>
      
      {userTxs.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receiver</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userTxs.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{tx.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{tx.sender}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{tx.receiver}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{tx.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
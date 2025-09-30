import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function ContractInfo() {
  const { fetchContractInfo } = useContext(resContext);
  const [contractData, setContractData] = useState(null);
  
  const handleFetch = async () => {
    const data = await fetchContractInfo();
    if (data) setContractData(data);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contract Info</h2>
      <button
        onClick={handleFetch}
        className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
      >
        Fetch Contract Info
      </button>
      {contractData && (
        <div className="mt-4 space-y-2 text-gray-600">
          <p><span className="font-medium">Contract Address:</span> {contractData.contractAddress}</p>
          <p><span className="font-medium">Owner:</span> {contractData.owner}</p>
          <p><span className="font-medium">Investigator:</span> {contractData.investigator}</p>
          <p><span className="font-medium">Total Transactions:</span> {contractData.totalTransactions}</p>
        </div>
      )}
    </div>
  );
}
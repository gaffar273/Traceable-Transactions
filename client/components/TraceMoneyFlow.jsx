import React, { useContext, useState } from "react";
import { resContext } from "../hooks/controller";

export function TraceMoneyFlow() {
  const { traceMoneyFlow } = useContext(resContext);
  const [address, setAddress] = useState("");
  const [flow, setFlow] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleTrace = async () => {
    if (!address) return;
    setLoading(true);
    const data = await traceMoneyFlow(address);
    if (data) setFlow(data);
    setLoading(false);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trace Money Flow</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={handleTrace}
          disabled={loading || !address}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {loading ? "Tracing..." : "Trace"}
        </button>
      </div>
      
      {flow && (
        <div className="mt-6">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-1">Starting Address:</p>
            <p className="text-xs text-gray-600 break-all font-mono">{flow.address}</p>
          </div>
          
          {flow.flowPath && flow.flowPath.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-700">Money Flow Path:</h3>
                <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full">
                  Total: {flow.flowPath.length} TX
                </span>
              </div>
              
              {/* All Transactions - Scrollable with max 2 visible */}
              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {flow.flowPath.map((step, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                        TX #{step.txId}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">Step {index + 1}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold mb-1">From:</p>
                        <p className="text-xs font-mono break-all bg-white p-2 rounded">{step.from}</p>
                      </div>
                      
                      <div className="text-purple-500 font-bold text-2xl">→</div>
                      
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold mb-1">To:</p>
                        <p className="text-xs font-mono break-all bg-white p-2 rounded">{step.to}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-700 text-center font-medium">No outgoing transactions found from this address</p>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
      `}</style>
    </div>
  );
}
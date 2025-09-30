import React from "react";
import { useContext, useState } from "react";
import { resContext } from "../hooks/controller";

export function CheckLoops() {
  const { checkLoops } = useContext(resContext);
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  
  const handleCheck = async () => {
    if (!address) return;
    const response = await checkLoops(address);
    if (response) setResult(response);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Check Transaction Loops</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleCheck}
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
        >
          Check Loops
        </button>
      </div>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Address:</span> {result.address}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Loop Detected:</span>
            {result.hasLoop ? (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium">
                Yes 
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                No 
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

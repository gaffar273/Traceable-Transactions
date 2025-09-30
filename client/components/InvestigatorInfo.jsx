import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function InvestigatorInfo() {
  const { investigator, fetchInvestigator } = useContext(resContext);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Investigator Info</h2>
      <button
        onClick={fetchInvestigator}
        className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
      >
        Fetch Investigator
      </button>
      {investigator && (
        <p className="mt-4 text-gray-600">
          <span className="font-medium">Investigator:</span> {investigator}
        </p>
      )}
    </div>
  );
}
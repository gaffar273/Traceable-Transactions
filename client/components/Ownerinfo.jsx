import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

function OwnerInfo() {

    const { owner, fetchOwner } = useContext(resContext);
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Owner Info</h2>
      <button
        onClick={fetchOwner}
        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Fetch Owner
      </button>
      {owner && (
        <p className="mt-4 text-gray-600">
          <span className="font-medium">Owner:</span> {owner}
        </p>
      )}
    </div>
  );
}

export default OwnerInfo;

import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function GetUserName() {
  const { fetchUserName } = useContext(resContext);
  const [address, setAddress] = useState("");
  const [nameData, setNameData] = useState(null);
  
  const handleFetch = async () => {
    if (!address) return;
    const data = await fetchUserName(address);
    if (data) setNameData(data);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Get User Name</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetch}
          className="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
        >
          Fetch Name
        </button>
      </div>
      
      {nameData && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            <span className="font-medium">Name:</span> {nameData.name}
          </p>
        </div>
      )}
    </div>
  );
}
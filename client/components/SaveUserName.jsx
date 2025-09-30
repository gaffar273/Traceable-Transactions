import React from "react";
import { useContext ,useState} from "react";
import { resContext } from "../hooks/controller";

export function SaveUserName() {
  const { saveUserName, loading } = useContext(resContext);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async () => {
    if (!address || !name) return;
    await saveUserName(address, name);
    setAddress("");
    setName("");
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Save User Name</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="User Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Real Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Name"}
        </button>
      </div>
    </div>
  );
}
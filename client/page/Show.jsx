import React from 'react'
import { AllTransactions } from '../components/AllTransactions'
import { UserTransactions } from '../components/UserTransactions'

const Show = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6 sm:px-8 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Transaction History
        </h2>
        
        {/* All Transactions Section */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <AllTransactions />
          </div>
        </div>
        
        {/* User Transactions Section */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <UserTransactions />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Show
import React from 'react'
import { TraceMoneyFlow } from '../components/TraceMoneyFlow'
import { CheckLoops } from '../components/CheckLoops'
import { SuspiciousTransactions } from '../components/SuspiciousTransactions'
import { FlagTransaction } from '../components/FlagTransaction'

const Investigation = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-6 sm:px-8 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Investigation Tools
        </h2>
        
        {/* Grid Layout - All items aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <TraceMoneyFlow />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <CheckLoops />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <SuspiciousTransactions />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <FlagTransaction />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Investigation
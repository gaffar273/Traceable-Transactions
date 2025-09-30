import React from 'react'
import { ContractInfo } from '../components/ContractInfo'
import { AddTransaction } from '../components/AddTransaction'
import { GetUserName } from '../components/GetUserName'
import { SaveUserName } from '../components/SaveUserName'

const Columntwo = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-6 sm:px-8 lg:px-12 w-full min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Transaction Management
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 hover:shadow-2xl transition-shadow">
                        <ContractInfo />
                        <div className="border-t border-gray-200 pt-6">
                            <AddTransaction />
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 hover:shadow-2xl transition-shadow">
                        <SaveUserName />
                        <div className="border-t border-gray-200 pt-6">
                            <GetUserName />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Columntwo
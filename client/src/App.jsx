import React from 'react'
import { Toaster } from 'react-hot-toast'
import Columntwo from '../page/columntwo'
import Investigation from '../page/Investigation'
import Show from '../page/Show'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Toaster position="top-right" reverseOrder={false} />
      
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Traceable Transactions DApp
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Secure, transparent, and efficient blockchain transaction management
            </p>
          </div>
        </div>
      </header>

      <main className="w-full">
        <section className="relative">
          <Columntwo />
        </section>

        <section className="relative">
          <Show />
        </section>

        <section className="relative">
          <Investigation />
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Traceable Transactions DApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
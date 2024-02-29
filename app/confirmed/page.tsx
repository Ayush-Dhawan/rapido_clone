import React from 'react'

export default function page() {
  return (
    <div className="text-center py-10 bg-blue-100">
      <div className="bg-white p-12 rounded-lg shadow-md inline-block">
        <div className="rounded-full h-24 w-24 bg-green-200 mx-auto">
          <span className="text-5xl text-green-600">&#x2713;</span>
        </div>
        <h1 className="text-4xl font-bold text-green-700 my-4">Success</h1>
        <p className="text-gray-700 text-lg">Your ride will arrive shortly!</p>
      </div>
    </div>
  )
}

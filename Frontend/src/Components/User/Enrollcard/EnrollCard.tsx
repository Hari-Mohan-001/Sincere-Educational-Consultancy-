import React from 'react'

const EnrollCard = () => {
  return (
    <div className="max-w-sm mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="flex items-center px-6 py-4">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-700">Enroll now to book your slots</h3>
        <p className="text-gray-600">Course description goes here. It provides a brief overview of the course content.</p>
      </div>
      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Enroll</button>
    </div>
  </div>
  )
}

export default EnrollCard

const EnrollCard = () => {
  return (
  //   <div className="max-w-sm mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
  //   <div className="flex items-center px-6 py-4">
  //     <div className="flex-grow">
  //       <h3 className="text-xl font-semibold text-gray-700">Enroll now to book your slots</h3>
  //       <p className="text-gray-600">Course description goes here. It provides a brief overview of the course content.</p>
  //     </div>
  //     <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Enroll</button>
  //   </div>
  // </div>
  <div className='flex h-72 mt-10'>
    <div className=' w-1/2 '>
    <div className='ml-28 mb-4'>
    <h1 className='mb-4'>Are you stuck in taking the <span className='text-cyan-500 font-semibold text-xl'>next step ???</span></h1>
    <div className='w-96'>
   <h1 className='text-indigo-600 font-bold text-2xl'>Enroll now for getting the online doubt session with our country counsellors. Clear 
    your doubts & get a better undrstanding of your future career options @ Rs. 99 only!!!
   </h1>
    </div>
    </div>
    <div>
      <button className='bg-cyan-700 text-white rounded-2xl ml-28 w-36 h-10'>Enroll Now</button>
    </div>
         
    </div>
    <div className='w-1/2'>
    <div className='h-72'>
    <img className='h-full w-auto object-cover shadow-xl rounded-lg' src="../../../Images/online4.jpg" alt="" />
    </div>
       
    </div>

  </div>
  )
}

export default EnrollCard
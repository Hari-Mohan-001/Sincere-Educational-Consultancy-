import React from 'react'
import Header from '../../../Components/Admin/Header/Header'
import AddEnrollment from '../../../Components/Admin/Enrollment/AddEnrollment'

const AddEnrollmentPage = () => {
  return (
    <div>
        <Header/>
        <div className='flex justify-center mt-3'>
        <AddEnrollment/>
        </div>
        
    </div>
  )
}

export default AddEnrollmentPage
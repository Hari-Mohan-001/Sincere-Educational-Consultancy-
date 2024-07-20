import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuggestionButton = () => {
const navigate = useNavigate()
    const handleClick =()=>{
      navigate("/courses")
    }
  return (
    <div className='flex justify-center mt-8'>
        <Button onClick={handleClick} variant='contained'>Suggestion For you</Button>
    </div>
  )
}

export default SuggestionButton
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SuggestionButton = () => {
const navigate = useNavigate()
    const handleClick =()=>{
      navigate("/suggestedCourses")
    }
  return (
    <div className='flex justify-center mt-8'>
        <Button onClick={handleClick} variant='contained'>See the suggestions For you</Button>
    </div>
  )
}

export default SuggestionButton
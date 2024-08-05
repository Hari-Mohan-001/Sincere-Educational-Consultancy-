import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface User{
  user:string
}

const NotfoundPage = ({user}:User) => {
  const navigate =useNavigate()
  
    const handleClick=()=>{
      if(user ==="counsellor"){
        navigate("/counsellor/university")
      }else if(user==="admin"){
        navigate("/admin/students")
      }else{
        navigate("/home")
      }
  
    }
  return (
    <div className="flex">
        <div>
        <img className="max-h-screen" src='../../../Images/pageNotFound.jpg' alt='Page Not Found'/>
        </div>
        <div className="mt-56">
        <Button onClick={handleClick} variant="contained" color="success"> Back to home</Button>
        </div>
        
    </div>
  )
}

export default NotfoundPage
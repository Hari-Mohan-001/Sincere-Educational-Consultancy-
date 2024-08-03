import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"


const OrderSuccessPage = () => {
    const navigate = useNavigate()
    const handleClick =()=>{
        navigate("/home")
    }
  return (
    <div className="flex justify-center">
        <div>
        <img src="../../../Images/orderSuccess.png"/>
        <Button onClick={handleClick} variant="contained">Back to Home</Button>
        </div>
        
    </div>
  )
}

export default OrderSuccessPage
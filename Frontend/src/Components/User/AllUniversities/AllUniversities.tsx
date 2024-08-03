import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { URL } from "../../../Constants/Constants"
import { useSelector } from "react-redux"
import { RootState } from "../../../Interface/User/UserInterface"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { toast } from "react-toastify"

interface UniversityData {
    id: string;
    name: string;
    address: string;
    ranking: string;
    country: string;
    logo: string;
    images: string[];
    isApproved: boolean;
  }

const AllUniversities = () => {

  const {user} = useSelector((state:RootState)=>state.user)
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const[err,setErr]= useState<string>("")
  const navigate = useNavigate()
  useEffect(()=>{
    const getAllUniversities = async()=>{
  try {
   
    
     const response = await axios.get(`${URL}/universities`,{
        withCredentials:true
     })
     
     const courses = response.data.getAllUniversities
     setUniversities(courses)

  } catch (error) {
    if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
            toast.error(error.response.data.message)
          setErr(error.response.data.message); // Assuming the backend sends the error message in 'message'
        } else {
          setErr(error.message);
        }
      } else {
        console.log('elseerr', error);
      }
    
  }
}
getAllUniversities()
  },[])

  const handleClick = (universityId:string)=>{
    navigate(`/universityDetails/${universityId}`)
  }
  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Universities</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {universities.map((university) => (
          <div key={university.id} className="flex flex-col items-center  sm:w-1/4 lg:w-1/4 p-2">
           
            <img className="w-96 h-60  shadow-2xl border rounded-lg" src={university.logo} alt={university.name} />
            <Button onClick={ ()=>handleClick(university.id)} variant="outlined">{university.name}</Button>
          </div>
          
        ))}
        
      </div>
    </div>
  )
}

export default AllUniversities 
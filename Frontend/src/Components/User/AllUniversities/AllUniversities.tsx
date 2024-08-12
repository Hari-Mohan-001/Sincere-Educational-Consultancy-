import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { URL } from "../../../Constants/Constants"
import { useNavigate } from "react-router-dom"
import { Button, Pagination } from "@mui/material"
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

  // const {user} = useSelector((state:RootState)=>state.user)
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const[err,setErr]= useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1);
  const universitiesPerPage = 6; // Number of universities to display per page
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
    navigate(`/universityDetails/`,{state:{universityId}})
  }

  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col items-center  w-full bg-cyan-100">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Universities</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {currentUniversities.map((university) => (
          <div key={university.id} className="flex flex-col items-center  sm:w-1/4 lg:w-1/4 p-2">
           
            <img className="w-96 h-60  shadow-2xl border rounded-lg" src={university.logo} alt={university.name} />
            <Button onClick={ ()=>handleClick(university.id)} variant="outlined">{university.name}</Button>
          </div>
          
        ))}
        
      </div>
      <Pagination
        count={Math.ceil(universities.length / universitiesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4 }}
      />
    </div>
  )
}

export default AllUniversities 
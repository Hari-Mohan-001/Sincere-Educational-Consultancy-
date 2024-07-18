import axios from "axios";
import { useEffect, useState } from "react"
import { URL } from "../../../../Constants/Constants";

interface Domain{
    id:string,
    name:string,
    image:string
}
const DomainCard = () => {

    useEffect(() => {
        const getDomains = async () => {
          try {
            const response = await axios.get(`${URL}/domains`); 
            const data = response.data;
            console.log("dom", data);
    
            setDomains(data.data);
          } catch (error) {
            console.log(error);
            // setError(error)
          }
        };
        getDomains();
      }, []);
      const[domains,setDomains] = useState<Domain[]>()
  return (

    <div className="mt-9">
        <h1 className="text-center text-2xl font-bold ">Major domains</h1>
     <div className="flex justify-around mt-12 p-1  bg-blue-950 rounded-lg shadow-xl">
       
        {domains?.map(domain=>{
        return <div className="flex flex-col">
        <div>
            <img className="w-52 h-48 rounded-lg" src={domain.image} alt="" />
        </div>
        <div className="ml-11">
            <button className="bg-slate-400 font-medium text-black rounded-lg min-w-28 h-auto mt-3 p-2">{domain.name}</button>
        </div>
    </div>
        })}
    
    </div>
    </div>
  )
}

export default DomainCard
import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository"


export const AllUniversities = (universityRepository:IUniversityRepository)=>{
    const execute =async()=>{
          const data = await universityRepository.getUniversities()
          if(data.length>=1){
            return data
          }else{
            throw new Error("No university listed");
            
          }
    }
    return{
        execute
    }
}
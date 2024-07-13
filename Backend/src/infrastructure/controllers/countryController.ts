import { Request,Response } from "express"
import { mongoCountryRepository } from "../persistance/mongoCountryRepository"
import { cloudinaryUpload } from "../services/CloudinaryUpload"
import { addNewCountry } from "../../application/use-cases/Country/createCountry"

const countryRepository = new mongoCountryRepository()

const countryControler = ()=>{
     
    const addCountry = async(req:Request,res:Response)=>{
        console.log('hiiie')
        const{name,image} = req.body  
        console.log(name);

        
        try {
            console.log('cntryyname', name);  
            
            const imageUploadUrl =await cloudinaryUpload(image)
            console.log(imageUploadUrl);
            
            const saveCountry =await addNewCountry(countryRepository).execute(name,imageUploadUrl)
           if(saveCountry){
            res.status(200).json({message:"country added successfully"})
           }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              }
        }
           
    }
    return{
        addCountry
    }
}

export default countryControler
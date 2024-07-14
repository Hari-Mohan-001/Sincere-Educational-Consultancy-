export const validateName = (name: string | undefined):string|null=>{
    if(!name){
      return "Name is required"
    }else{
      return null
    }
  }
export const validateAddress = (address: string | undefined):string|null=>{
    if(!address){
      return "Address is required"
    }else{
      return null
    }
  }
export const validateRanking = (number: string | undefined):string|null=>{
    if(!number){
      return "Ranking is required"
    }else if(parseFloat(number)<1){
      return "Ranking should be more than one"
    }else{
        return null
    }
  }

  export const validateCountry =(country:string|undefined):string|null=>{
    if(!country){
        return "Country is required"
    }
    return null
    }

const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  export const validateLogo =(logo:File|undefined):string|null=>{
    if(!logo){
        return "Country is required"
    }else if(!allowedFormats.includes(logo.type)){
 return "Please choose image file"
    }
    return null
    }
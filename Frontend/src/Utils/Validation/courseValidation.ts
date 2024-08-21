export const validateCourseName = (name: string | undefined):string|null=>{
    if(!name){
      return "Name is required"
    }else{
      return null
    }
  }
export const validateDescription = (description: string | undefined):string|null=>{
    if(!description){
      return "Description is required"
    }else{
      return null
    }
  }

  export const validateCourseDuration = (duration: string | undefined):string|null=>{
    if(!duration){
      return "Duration is required"
    }else{
      return null
    }
  }
// export const validateRanking = (number: string | undefined):string|null=>{
//     if(!number){
//       return "Ranking is required"
//     }else if(parseFloat(number)<1){
//       return "Ranking should be more than one"
//     }else{
//         return null
//     }
//   }

  export const validateCourseQualification =(qualification:string|undefined):string|null=>{
    if(!qualification){
        return "qualification is required"
    }
    return null
    }

    export const validateCourseUniversity =(university:string[]|undefined):string|null=>{
        if(!university){
            return "university is required"
        }
        return null
        }

    export const validateCourseFees =(fees:string|undefined):string|null=>{
        if(!fees){
            return "fees is required"
        }
        return null
        }

        export const validateCourseDomain =(domain:string|undefined):string|null=>{
            if(!domain){
                return "domain is required"
            }
            return null
            }

const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  export const validateCourseLogo =(logo:File|undefined):string|null=>{
    if(!logo){
        return "Logo is required"
    }else if(!allowedFormats.includes(logo.type)){
 return "Please choose image file"
    }
    return null
    }
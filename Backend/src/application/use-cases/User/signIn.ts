import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";
import bcrypt from "bcrypt"
import { signInUseCase } from "../../interfaces/signIn";

 const signIn = (userRepository:IUserRepository): signInUseCase=>{
      
    const execute = async(email: string, password:string)=>{
         const user = await userRepository.findUserByEmail(email)
         if(!user) throw new Error("Invalid Credentials");
         
         const isValidPassword = bcrypt.compareSync(password, user.password)

         if(!isValidPassword) throw new Error("Invalid credentials");
console.log('valid',isValidPassword);

         return user
         
    }
    return{
        execute
    }
}

export default signIn
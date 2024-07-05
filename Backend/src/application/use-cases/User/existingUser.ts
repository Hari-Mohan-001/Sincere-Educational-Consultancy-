import { IUserRepository } from "../../../domain/repositories/IUserRepositary";
import { userDTO } from "../../dtos/userDto";

// export const async checkUserExist = ()=>{
//     const userExist = await IuserRepository.doesEmailExist(userDto.email)
//     if(userExist) throw new Error("This email already exist") //check if email exist

// }

export class checkUserExist {
    constructor(private userRepository:IUserRepository) {}

    public async execute(userDto:userDTO):Promise<void>{
       const userExist = await this.userRepository.doesEmailExist(userDto.email)
       if(userExist) throw new Error("This email already exist");
       
    }
}


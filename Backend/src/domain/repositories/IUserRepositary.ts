import { userUpdateDTO } from "../../application/dtos/userUpdateDto"
import {User} from "../entities/User"

export interface IUserRepository {
      createUser(user:User) : Promise<User>
      doesEmailExist(email:string):Promise<boolean>
      findUserByEmail(email:string):Promise<User | null>
      findUserById(id:string):Promise<User | null>
      resetPassword(id:string,password:string):Promise<boolean>
      getAllUsers():Promise<User[]>
      blockOrUnblockUser(userId:string):Promise<boolean>
      updateUserEnrollStatus(userId:string):Promise<boolean>
      updateUser(userId:string, userDto:userUpdateDTO):Promise<User|null>
      updateUserRefreshToken(refreshToken:string,userId:string):Promise<boolean>
      deleteUserRefreshToken(userId:string):Promise<boolean>
}
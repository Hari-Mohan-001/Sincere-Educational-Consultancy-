import {User} from "../entities/User"

export interface IUserRepository {
      createUser(user:User) : Promise<User>
      doesEmailExist(email:string):Promise<boolean>
      findUserByEmail(email:string):Promise<User | null>
      findUserById(id:string):Promise<User | null>
      resetPassword(id:string,password:string):Promise<boolean>
      getAllUsers():Promise<User[]>
}
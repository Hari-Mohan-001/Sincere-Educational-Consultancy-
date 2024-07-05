import { User } from "../../domain/entities/User";

export interface signInUseCase{
    execute(email:string, password:string):Promise<User>
}
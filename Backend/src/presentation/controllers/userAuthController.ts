import {Request, Response} from "express"
import { SignUp } from "../../application/use-cases/User/signUp"
import { userDTO } from "../../application/dtos/userDto"


export class userAuthController {
    constructor(
       private signUpUseCase:SignUp
    ){}

    public async signUp(req:Request, res:Response):Promise<void>{
            const{name, email, mobile, password, qualification} = req.body
            const userDto = new userDTO(name,email,mobile,password,qualification)
            await this.signUpUseCase.execute(userDto)
    }
}
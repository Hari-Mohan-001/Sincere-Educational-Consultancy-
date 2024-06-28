import { IUserRepository } from "../../domain/repositories/IUserRepositary";
import userModel from "../../presentation/models/UserModel";
import { User } from "../../domain/entities/User";

export class mongoUserRepository implements IUserRepository{
     public async createUser(user: User): Promise<void> {
        const newUser = new userModel({
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            password:user.password,
            qualification:user.qualification
        })
        await newUser.save()
    }
}
import { User } from "../../../domain/entities/User";
import { userDTO } from "../../dtos/userDto";
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";

export class SignUp {
  constructor(private userRepository: IUserRepository) {}

  public async execute(userDto: userDTO): Promise<User> {

    const user = new User(
      "",
      userDto.name,
      userDto.email,
      userDto.mobile,
      userDto.password,
      userDto.qualification,
      userDto?.image,
      userDto.isEnrolled,
      userDto.isBlocked
    );
    
    await user.hashPassword()
    return await this.userRepository.createUser(user);

  }
}

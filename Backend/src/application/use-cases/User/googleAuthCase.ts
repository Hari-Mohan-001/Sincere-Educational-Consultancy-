import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";
import bcrypt from "bcrypt";
import { signInUseCase } from "../../interfaces/signIn";
import { userDTO } from "../../dtos/userDto";

const googleAuthCase = (userRepository: IUserRepository) => {
  const execute = async (userDto: userDTO) => {
    const user = await userRepository.findUserByEmail(userDto.email);
    if (user) {
      return user;
    } else {
      const randomPassword = Math.random().toString().slice(-8);
      const hashedPassword = bcrypt.hashSync(randomPassword, 10);
      userDto.password = hashedPassword;
      const user = new User(
        "",
        userDto.name,
        userDto.email,
        userDto.mobile,
        userDto.password,
        userDto.qualification,
        userDto.image,
        userDto.isEnrolled,
        userDto.isBlocked
      );
      const newUser = await userRepository.createUser(user);
      if(newUser){
        return newUser
      }else{
        throw new Error("User creation failed");
        
      }
    }
  };
  return {
    execute,
  };
};

export default googleAuthCase;

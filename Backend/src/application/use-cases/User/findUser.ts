import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";

export const findUserByEmail = (userRepository: IUserRepository) => {
  const execute = async (email: string): Promise<User> => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid Credentials");

    return user;
  };
  return {
    execute,
  };
};

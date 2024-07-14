import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";

const getAllUsers = (userRepository: IUserRepository) => {
  const execute = async () =>{
    const users = await userRepository.getAllUsers();
    if (!users) throw new Error("No users/Unable to fetch users");

    return users;
  };
  return {
    execute,
  };
};

export default getAllUsers;

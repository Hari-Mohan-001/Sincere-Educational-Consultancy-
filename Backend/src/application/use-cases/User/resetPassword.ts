import bcrypt from "bcrypt";

import { IUserRepository } from "../../../domain/repositories/IUserRepositary";

interface ResetInfo {
  userId: string;
  token: string;
  tokenExpiry: number;
}

const resetTokenStorage: Map<string, ResetInfo> = new Map();

export const storeResetInfo = (
  uniqueIdentifier: string,
  resetInfo: ResetInfo
): void => {
  resetTokenStorage.set(uniqueIdentifier, resetInfo);
};

export const getResetInfo = (
  uniqueIdentifier: string
): ResetInfo | undefined => {
  return resetTokenStorage.get(uniqueIdentifier);
};

export const verifyResetInfo = (uniqueIdentifier: string): ResetInfo => {
  const resetInfo = resetTokenStorage.get(uniqueIdentifier);

  if (!resetInfo) {
    throw new Error("Invalid or session expired");
  }

  if (resetInfo.tokenExpiry < Date.now()) {
    throw new Error("Session expired");
  }

  return resetInfo;
};

export const clearResetInfo = (uniqueIdentifier: string): void => {
  resetTokenStorage.delete(uniqueIdentifier);
};

export const resetPasswordUseCase = (userRepository: IUserRepository) => {
  const findUser = async (id: string) => {
    try {
      const user = await userRepository.findUserById(id);
      if (!user) {
        throw new Error("User does not exist");
      }
      return user;
    } catch (error) {
      throw new Error("User does not exist");
    }
  };

  const updatePassword = async (
    id: string,
    password: string
  ): Promise<boolean> => {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await userRepository.resetPassword(id, hashedPassword);
      if (!user) {
        throw new Error("Password reset failed");
      }
      return true;
    } catch (error) {
      throw new Error("Password rest failed");
    }
  };
  return {
    findUser,
    updatePassword,
  };
};

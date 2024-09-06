import { IUserRepository } from "../../domain/repositories/IUserRepositary";
import userModel from "../../presentation/models/UserModel";
import { User } from "../../domain/entities/User";
import { userUpdateDTO } from "../../application/dtos/userUpdateDto";
import { userStatusData } from "../../application/interfaces/userStatusData";

export class mongoUserRepository implements IUserRepository {
  public async createUser(user: User): Promise<User> {
    const newUser = new userModel({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      qualification: user.qualification,
    });
    const newSavedUser = await newUser.save();
    return new User(
      newSavedUser.id,
      newSavedUser.name,
      newSavedUser.email,
      newSavedUser.mobile,
      newSavedUser.password,
      newSavedUser.qualification,
      newSavedUser.image,
      newSavedUser.isBlocked,
      newSavedUser.isEnrolled
    );
  }

  public async doesEmailExist(email: string): Promise<boolean> {
    const user = await userModel.findOne({ email });
    return user !== null;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ email });
    if (user?.isBlocked) {
      throw new Error("You are blocked");
    }
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.mobile,
      user.password,
      user.qualification,
      user.image,
      user.isBlocked,
      user.isEnrolled
    );
  }

  public async findUserById(id: string): Promise<User | null> {
    const user = await userModel.findById(id);
    if (!user) {
      return null;
    }
    return new User(
      user.id,
      user.name,
      user.email,
      user.mobile,
      user.password,
      user.qualification,
      user.image,
      user.isBlocked,
      user.isEnrolled,
      user.refreshToken
    );
  }

  public async resetPassword(
    id: string,
    hashedPassword: string
  ): Promise<boolean> {
    const updatePassword = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { password: hashedPassword },
      }
    );

    if (updatePassword) {
      return true;
    }
    return false;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await userModel.find();
    return users.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.mobile,
          user.password,
          user.qualification,
          user.image,
          user.isBlocked,
          user.isEnrolled
        )
    );
  }

  public async blockOrUnblockUser(userId: string): Promise<boolean> {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return false;
      }
      if (user?.isBlocked) {
        const unblockUser = await userModel.findByIdAndUpdate(
          userId,
          {
            $set: {
              isBlocked: false,
            },
          },
          { new: true }
        );
        return !!unblockUser;
      } else {
        const blockUser = await userModel.findByIdAndUpdate(
          userId,
          {
            $set: {
              isBlocked: true,
            },
          },
          { new: true }
        );

        return !!blockUser;
      }
    } catch (error) {
      throw error;
    }
  }

  public async updateUserEnrollStatus(userId: string): Promise<boolean> {
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            isEnrolled: true,
          },
        },
        { new: true }
      );
      return updateUser != null;
    } catch (error) {
      throw error;
    }
  }

  public async updateUserRefreshToken(
    refreshToken: string,
    userId: string
  ): Promise<boolean> {
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            refreshToken: refreshToken,
          },
        },
        { new: true }
      );
      return updateUser != null;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserRefreshToken(userId: string): Promise<boolean> {
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            refreshToken: "",
          },
        },
        { new: true }
      );
      return updateUser != null;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(
    userId: string,
    userDto: userUpdateDTO
  ): Promise<User | null> {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            name: userDto.name,
            email: userDto.email,
            mobile: userDto.mobile,
            password: userDto.password,
            image: userDto.image,
          },
        },
        { new: true }
      );
      if (updatedUser) {
        return new User(
          updatedUser.id,
          updatedUser.name,
          updatedUser.email,
          updatedUser.mobile,
          updatedUser.password,
          updatedUser.qualification,
          updatedUser.image,
          updatedUser.isBlocked,
          updatedUser.isEnrolled
        );
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  public async getUserStatus(userId: string): Promise<userStatusData | null> {
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        return null;
      } else {
        return new userStatusData(
          user._id.toString(),
          user.name,
          user.image,
          user.isOnline,
          user.lastSeen
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

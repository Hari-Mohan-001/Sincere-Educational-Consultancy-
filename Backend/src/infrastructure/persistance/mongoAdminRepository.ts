import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import adminModel from "../../presentation/models/adminModel";
import { Admin } from "../../domain/entities/admin";
import { userStatusData } from "../../application/interfaces/userStatusData";

export class mongoAdminRepository implements IAdminRepository {
  public async createAdmin(user: Admin): Promise<Admin> {
    const newAdmin = new adminModel({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      country: user.country,
    });
    const newSavedAdmin = await newAdmin.save();
    return new Admin(
      newSavedAdmin.id,
      newSavedAdmin.name,
      newSavedAdmin.email,
      newSavedAdmin.mobile,
      newSavedAdmin.password,
      newSavedAdmin.country,
      newSavedAdmin.role,
      newSavedAdmin.image
    );
  }

  public async doesEmailExist(email: string): Promise<boolean> {
    const user = await adminModel.findOne({ email, role: "counsellor" });
    return user !== null;
  }

  public async findAdminByEmail(email: string): Promise<Admin | null> {
    const admin = await adminModel.findOne({ email, role: "admin" });
    if (!admin) return null;
    return new Admin(
      admin.id,
      admin.name,
      admin.email,
      admin.mobile,
      admin.password,
      admin.country,
      admin.role,
      admin.image
    );
  }
  public async findCounsellorByEmail(email: string): Promise<Admin | null> {
    const admin = await adminModel.findOne({ email, role: "counsellor" });
    if (!admin) return null;
    return new Admin(
      admin.id,
      admin.name,
      admin.email,
      admin.mobile,
      admin.password,
      admin.country,
      admin.role,
      admin.image
    );
  }

   public async getCounsellorData(id: string): Promise<userStatusData | null> {
    try {
      const counsellor = await adminModel.findById(id)
      if(!counsellor) return null

      return new userStatusData(
        counsellor.id,
        counsellor.name,
        counsellor.image,
        counsellor.isOnline,
        counsellor.lastSeen
      )
    } catch (error) {
      throw error
    }
  }
}

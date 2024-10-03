import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import adminModel from "../../presentation/models/adminModel";
import { Admin } from "../../domain/entities/admin";
import { userStatusData } from "../../application/interfaces/userStatusData";
import mongoose, { Mongoose } from "mongoose";
import { Counsellor } from "../../domain/entities/counsellor";
import { response } from "express";

export class mongoAdminRepository implements IAdminRepository {
  public async createAdmin(user: Admin): Promise<Admin> {
    const countryId = new mongoose.Types.ObjectId(user.country)
    const newAdmin = new adminModel({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      country: countryId,
    });
    const newSavedAdmin = await newAdmin.save();
    return new Admin(
      newSavedAdmin.id,
      newSavedAdmin.name,
      newSavedAdmin.email,
      newSavedAdmin.mobile,
      newSavedAdmin.password,
      newSavedAdmin.country.toString(),
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
      admin.country.toString(),
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
      admin.country.toString(),
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

   public async getAllApprovedCounsellors(): Promise<Counsellor[] | null> {
    try {
      const counsellors = await adminModel.find({role:"counsellor", isApproved:true})
      .populate("country",'name');
      
      return counsellors.  
      map((counsellor)=>
       new Counsellor(
        counsellor.id,
        counsellor.name,
        counsellor.email,
        counsellor.mobile,
        counsellor.password,
        ((counsellor.country as unknown) as { name: string }).name,  // First cast to 'unknown' then to the object type
        counsellor.role,
        counsellor.image,
        counsellor.isApproved
      )
    )
    } catch (error) {
      throw error
    }
  }

  public async getUnApprovedCounsellorCount(): Promise<number | null> {
    try {
      const count = await adminModel.countDocuments({role:"counsellor", isApproved:false})
      console.log(count);
      
      return count
    } catch (error) {
      throw error
    }
  }

  public async getUnApprovedCounsellors(): Promise<Counsellor[] | null> {
    try {
      const counsellors = await adminModel.find({role:"counsellor", isApproved:false})
      .populate("country",'name');
      
      return counsellors.  
      map((counsellor)=>
       new Counsellor(
        counsellor.id,
        counsellor.name,
        counsellor.email,
        counsellor.mobile,
        counsellor.password,
        ((counsellor.country as unknown) as { name: string }).name,  // First cast to 'unknown' then to the object type
        counsellor.role,
        counsellor.image,
        counsellor.isApproved
      )
    )
    } catch (error) {
      throw error
    }
  }

  public async approveCounsellor(counsellorId: string): Promise<boolean> {
    try {
      const response = await adminModel.findByIdAndUpdate(counsellorId ,
        {
          $set:{
            isApproved:true
          },
         
        },
        {new:true}
      )
      return response!= null
    } catch (error) {
      throw error
    }
  }

  public async isCounsellorApproved(email: string): Promise<boolean> {
    try {
      const isApproved = await adminModel.findOne({ email, role: "counsellor", isApproved:true })
      return isApproved!= null
    } catch (error) {
      throw error
    }
  }
}

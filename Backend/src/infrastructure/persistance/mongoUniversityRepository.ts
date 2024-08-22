import mongoose, { Types } from "mongoose";
import {
  Country,
  IUniversityDocument,
  PopulatedUniversity,
  University,
} from "../../domain/entities/university";
import { IUniversityRepository } from "../../domain/repositories/IUniversityRepository";
import universityModel from "../../presentation/models/universityModel";
import { universityDTO } from "../../application/dtos/universityDto";

export class mongoUniversityRepository implements IUniversityRepository {
  public async createUniversity(
    university: universityDTO
  ): Promise<University> {
    // Convert the country field to ObjectId if it's a string
    const countryId =
      typeof university.country === "string"
        ? new Types.ObjectId(university.country)
        : university.country;
    const createNewUniversity = new universityModel({
      name: university.name,
      address: university.address,
      ranking: university.ranking,
      logo: university.logo,
      images: university.images,
      country: countryId,
    });
    const newUniversity = await createNewUniversity.save();
    return new University(
      newUniversity._id.toString(),
      newUniversity.name,
      newUniversity.address,
      newUniversity.ranking,
      newUniversity.logo,
      newUniversity.images,
      newUniversity.country,
      newUniversity.isApproved
    );
  }

  public async getAllUniversities(
    countryId: string
  ): Promise<PopulatedUniversity[]> {
    const universities = await universityModel
      .find({ country: countryId, isApproved: true })
      .populate("country");
    return universities.map(
      (university) =>
        new PopulatedUniversity(
          university._id.toString(),
          university.name,
          university.address,
          university.ranking,
          university.logo,
          university.images,
          university.country,
          university.isApproved
        )
    );
  }
  public async getUniversities(): Promise<PopulatedUniversity[]> {
    const universities = await universityModel
      .find({ isApproved: true })
      .populate("country");
    return universities.map(
      (university) =>
        new PopulatedUniversity(
          university._id.toString(),
          university.name,
          university.address,
          university.ranking,
          university.logo,
          university.images,
          university.country,
          university.isApproved
        )
    );
  }

  public async approveUniversity(universityId: string): Promise<boolean> {
    try {
      const university = await universityModel.findById(universityId);
      if (!university) {
        return false;
      }
      const approve = await universityModel.findByIdAndUpdate(
        universityId,
        {
          $set: {
            isApproved: true,
          },
        },
        { new: true }
      );
      if (approve) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  public async getApprovedUniversitiesForAdmin(): Promise<University[]> {
    try {
      const universities = await universityModel.aggregate([
        {
          $match: {
            isApproved: true,
          },
        },
        {
          $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "countryDetails",
          },
        },
        {
          $unwind: "$countryDetails",
        },
        {
          $addFields: {
            countryName: "$countryDetails.name",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            address: 1,
            ranking: 1,
            logo: 1,
            images: 1,
            country: 1,
            isApproved: 1,
            countryName: 1,
          },
        },
      ]);

      return universities as University[];
    } catch (error) {
      throw error;
    }
  }

  public async getUniversity(
    universityId: string
  ): Promise<PopulatedUniversity> {
    try {
      const university = await universityModel
        .findById(universityId)
        .populate("country");
      if (!university) {
        throw new Error("University not found");
      }
      return new PopulatedUniversity(
        university._id.toString(),
        university.name,
        university.address,
        university.ranking,
        university.logo,
        university.images,
        university.country,
        university.isApproved
      );
    } catch (error) {
      throw error;
    }
  }

  public async getNotApprovedUniversities(): Promise<University[]> {
    try {
      const universities = await universityModel.aggregate([
        {
          $match: {
            isApproved: false,
          },
        },
        {
          $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "countryDetails",
          },
        },
        {
          $unwind: "$countryDetails",
        },
        {
          $addFields: {
            countryName: "$countryDetails.name",
          },
        },
      ]);

      return universities as University[];
    } catch (error) {
      throw error;
    }
  }
}

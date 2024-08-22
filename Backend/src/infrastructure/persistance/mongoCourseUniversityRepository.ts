import { ICourseUniversityRepository } from "../../domain/repositories/ICourseUniversityRepository";
import { University } from "../../domain/entities/university";
import courseUniversityModel from "../../presentation/models/CourseUniversityModel";
import mongoose from "mongoose";

export class mongoCourseUniversityRepository
  implements ICourseUniversityRepository
{
  public async fetchAllUniversitiesForACourse(
    courseId: string
  ): Promise<University[]> {
    try {
      const universities = await courseUniversityModel.aggregate([
        {
          $match: {
            courseId: new mongoose.Types.ObjectId(courseId),
          },
        },
        {
          $lookup: {
            from: "universities",
            localField: "universityId",
            foreignField: "_id",
            as: "universityDetails",
          },
        },
        {
          $match: {
            "universityDetails.isApproved": true,
          },
        },
        {
          $unwind: "$universityDetails",
        },
        {
          $replaceRoot: {
            newRoot: "$universityDetails",
          },
        },
      ]);
      return universities;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

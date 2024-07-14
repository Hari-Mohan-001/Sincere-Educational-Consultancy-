import mongoose, { Types } from "mongoose";
import { University } from "../../domain/entities/university";
import { IUniversityRepository } from "../../domain/repositories/IUniversityRepository";
import universityModel from "../../presentation/models/universityModel";

export class mongoUniversityRepository implements IUniversityRepository {
  public async createUniversity(university: University): Promise<University> {
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
      newUniversity.country.toString(),
      newUniversity.isApproved
    );
  }

  public async getAllUniversities(countryId: string): Promise<University[]> {
    const universities = await universityModel.find({ country: countryId }).populate('country', 'name');
    return universities.map(
      (university) =>
        new University(
          university._id.toString(),
          university.name,
          university.address,
          university.ranking,
          university.logo,
          university.images,
          university.country.toString(),
          university.isApproved
        )
    );
  }
}

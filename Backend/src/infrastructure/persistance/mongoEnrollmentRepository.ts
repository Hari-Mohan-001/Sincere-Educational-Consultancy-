import { enrollmentDTO } from "../../application/dtos/enrollmentDto";

import { Enrollment } from "../../domain/entities/enrollment";

import { IEnrollmentRepository } from "../../domain/repositories/IEnrollmentRepository";

import enrollmentModel from "../../presentation/models/enrollmentModel";

export class mongoEnrollmentRepository implements IEnrollmentRepository {
  public async createEnrollment(
    enrollment: enrollmentDTO
  ): Promise<Enrollment> {
    try {
      const addNewEnrollment = new enrollmentModel({
        name: enrollment.name,
        amount: enrollment.amount,
        image: enrollment.image,
      });
      const newEnrollment = await addNewEnrollment.save();
      return new Enrollment(
        newEnrollment._id.toString(),
        newEnrollment.name,
        newEnrollment.amount,
        newEnrollment.image
      );
    } catch (error) {
      throw error;
    }
  }
  public async getAllEnrollments(): Promise<Enrollment[]> {
    try {
      const enrollments = await enrollmentModel.find();
      if (!enrollments.length) {
        throw new Error("No enrollments found");
      }
      return enrollments.map(
        (enrollment) =>
          new Enrollment(
            enrollment._id.toString(),
            enrollment.name,
            enrollment.amount,
            enrollment.image
          )
      );
    } catch (error) {
      throw error;
    }
  }

  public async updateEnrollment(
    enrollId: string,
    enrollAmount: string
  ): Promise<boolean> {
    try {
      const update = await enrollmentModel.findByIdAndUpdate(
        enrollId,
        {
          $set: {
            amount: enrollAmount,
          },
        },
        { new: true }
      );
      return update != null;
    } catch (error) {
      throw error;
    }
  }
}

import { ObjectId } from "mongoose";

export class CourseDTO {
  constructor(
    public name: string,
    public qualification: string,
    public fees: string,
    public duration: string,
    public description: string,
    public logo: string,
    public university: string | ObjectId,
    public domain: string | ObjectId
  ) {}
}

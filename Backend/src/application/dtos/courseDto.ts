import { ObjectId } from "mongoose";

export class CourseDTO {
  constructor(
    public name: string,
    public qualification: string,
    public fees: string,
    public duration: string,
    public description: string,
    public logo: string,
    public universities: string[],
    public domain: string | ObjectId
  ) {}
}

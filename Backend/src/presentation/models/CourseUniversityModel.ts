import mongoose from "mongoose";

const courseUniversitySchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    universityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"University"
    },
})

const courseUniversityModel = mongoose.model('CourseUniversity', courseUniversitySchema)

export default courseUniversityModel
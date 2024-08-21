export interface CourseData {
    id:string
    name: string;
    qualification: string;
    fees: string;
    description: string;
    duration: string;
    universities: string[];
    domain: string;
    logo: string;
  }

  export interface CreateCourseData{
    name?: string;
  qualification?: string;
  fees?: string;
  description?: string;
  duration?: string;
  universities?: string[];
  domain?: string;
  logo?: string;
  }

  
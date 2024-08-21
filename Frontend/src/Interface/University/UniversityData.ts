export interface UniversityData {
    _id: string;
    name: string;
    address: string;
    ranking: string;
    country: string;
    logo: string;
    images: string[];
    isApproved: boolean;
  }


  export interface CreateUniversityData{
    name?: string;
    address?: string;
    ranking?: string;
    country?: string;
    logo?: string;
    images?: string[];
  }
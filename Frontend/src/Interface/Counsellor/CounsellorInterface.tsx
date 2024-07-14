export interface CounsellorData{
    name:string,
    email:string,
    mobile: string,
    password:string,
    confirmPassword: string,
    country:string,
}

export interface ResponseCounsellorData{
    id:string,
    name:string,
    email:string,
    mobile: string,
    country:string,
    image?: string,
    role?:string
}

export interface ResponseData{
    success?:Boolean,
    message:string,
    counsellor?:ResponseCounsellorData,
    error?: string
}

export interface CounsellorState {
    counsellor: ResponseCounsellorData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export interface signInCounsellorData{
    email:string,
    password:string
  }

  export interface CounsellorRootState {
    counsellor: CounsellorState;
  }

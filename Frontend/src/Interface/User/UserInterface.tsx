export interface UserData{
    name:string,
    email:string,
    mobile: string,
    qualification:string,
    password:string,
    confirmPassword: string
}

export interface ResponseUserData{
    id:string,
    name:string,
    email:string,
    mobile: string,
    qualification:string,
    isEnrolled:Boolean,
    isBlocked:Boolean
}

export interface ResponseData{
    success:Boolean,
    message:string,
    user?:ResponseUserData,
    error?: string
}

export interface UserState {
    user: ResponseUserData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export interface signInUserData{
    email:string,
    password:string
  }
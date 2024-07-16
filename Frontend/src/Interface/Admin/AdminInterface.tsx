
export interface ResponseAdminData{
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
    admin?:ResponseAdminData,
    error?: string
}

export interface AdminState {
    admin: ResponseAdminData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

export interface signInAdminData{
    email:string,
    password:string
  }

  export interface AdminRootState {
    admin: AdminState;
  }
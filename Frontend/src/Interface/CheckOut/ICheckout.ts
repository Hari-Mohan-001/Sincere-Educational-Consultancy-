interface EnrollmentData {
    id: string;
    name: string;
    amount: string;
    image: string;
  }

export interface CheckoutData{
    enrolldetails:EnrollmentData|undefined,
    country:string,
    userId:string|undefined,
    totalAmount:number
}
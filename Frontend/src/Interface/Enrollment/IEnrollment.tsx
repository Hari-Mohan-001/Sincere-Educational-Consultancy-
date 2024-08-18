export interface AddEnrollmentData {
  name: string;
  amount: number;
  image: string|null;
}

export interface Enrollment {
  id: string;
  name: string;
  amount: string;
  image: string;
}

export interface updateEnrollmentData {
  enrollId: string | undefined;
  enrollAmount: string | number;
}

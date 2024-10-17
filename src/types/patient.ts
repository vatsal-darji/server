export interface ICreatePatient {
  name: string;
  email: string;
  password: string;
  age: number;
  condition: string;
  treatment_plan: string;
  medicalHistory?: string[];
  role?: "admin" | "provider" | "patient";
}

export interface IUpdatePatient {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  condition?: string;
  medicalHistory?: string[];
  role?: "admin" | "provider" | "patient";
}

import {
  getAllPatients,
  getPatientByEmail,
  updatePatient,
  deletePatient,
} from "../repository/patient";
import { IPatient } from "../model/patient";

export const getAllPatientsInDB = async (page: number, limit: number) => {
  return await getAllPatients(page, limit);
};

export const findPatientByEmailInDB = async (email: string) => {
  const patient = await getPatientByEmail(email);
  if (!patient) throw new Error("Patient not found");
  return patient;
};

export const updatePatientInDB = async (
  email: string,
  patientData: Partial<IPatient>
) => {
  return await updatePatient(email, patientData);
};

export const deletePatientInDB = async (email: string) => {
  return await deletePatient(email);
};

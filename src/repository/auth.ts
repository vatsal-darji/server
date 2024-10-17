import { Patient, IPatient } from "../model/patient";
import { ICreatePatient } from "../types/patient";

export const registerPatient = async (patientData: ICreatePatient) => {
  return await Patient.create(patientData);
};

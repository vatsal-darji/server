import { IPatient, Patient } from "../model/patient";
import { registerPatient } from "../repository/auth";
import { ICreatePatient } from "../types/patient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const validatePatient = async (patient: {
  email: string;
  password: string;
}) => {
  const getPatient = await Patient.findOne({
    email: patient.email,
  });

  if (!getPatient) {
    throw new Error("Invalid credentials"); // Return if the patient does not exist
  }

  const isMatch = await bcrypt.compare(patient.password, getPatient.password);
  if (!isMatch) {
    throw new Error("Invalid credentials"); // Return if password does not match
  }

  // Exclude password from the returned patient data
  const { password, ...result } = getPatient.toObject(); // Use toObject to convert mongoose document to plain object
  return result as IPatient; // Return the patient object excluding the password
};

export const registerNewPatientInDB = async (patientData: ICreatePatient) => {
  const patient = await Patient.findOne({
    email: patientData.email,
  });
  if (patient) {
    throw new Error("user is already exists");
  }
  return await registerPatient(patientData);
};

export const login = async (patient: IPatient) => {
  const payload = {
    id: patient._id,
    email: patient.email,
    role: patient.role,
  }; // Include id
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "365d",
  });
  console.log("Generated Token Payload: ", payload);
  return {
    access_token: token,
  };
};

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  login,
  registerNewPatientInDB,
  validatePatient,
} from "../service/auth";
import { ICreatePatient } from "../types/patient";
import { findPatientByEmailInDB } from "../service/patient";

const createPatient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userPayload: ICreatePatient = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      condition: req.body.condition,
      medicalHistory: req.body.medicalHistory,
      treatment_plan: req.body.treatment_plan,
      role: req.body.role || "patient", // Default to 'patient'
    };

    const patient = await registerNewPatientInDB(userPayload);
    return res.status(201).json({
      success: true,
      message: "Patient created successfully!",
      data: patient,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const loginPatient = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const patient = await validatePatient({ email, password });

    const token = (await login(patient)).access_token;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        patient: {
          name: patient.name,
          email: patient.email,
          role: patient.role,
        },
      },
    });
  } catch (error: any) {
    console.error("Login error: ", error.message); // Log specific error message
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong during login.",
      data: null,
    });
  }
};

export { createPatient, loginPatient };

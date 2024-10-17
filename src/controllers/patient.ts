import { Request, Response } from "express";
import {
  deletePatientInDB,
  findPatientByEmailInDB,
  getAllPatientsInDB,
  updatePatientInDB,
} from "../service/patient";
import { IUpdatePatient } from "../types/patient";

// Get all patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getAllPatientsInDB(page, limit);

    return res.status(200).json({
      success: true,
      data: result.patients,
      meta: {
        totalPatients: result.totalPatients,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      },
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

// Get one patient by email
export const getOnePatientByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const patient = await findPatientByEmailInDB(email);
    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Delete a patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await deletePatientInDB(email);
    return res.status(204).send();
  } catch (error: any) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// Update a patient
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const patientPayload: IUpdatePatient = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      condition: req.body.condition,
      medicalHistory: req.body.medicalHistory,
      role: req.body.role || "patient", // Default to 'patient'
    };
    const updatedPatient = await updatePatientInDB(email, patientPayload);
    return res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

import { Request, Response } from "express";
import {
  createAuthRequestInDB,
  getAllRequestsInDB,
  getRequestsByPatientInDB,
  changeRequestStatusInDB,
} from "../service/authRequest";

// Controller to create a new request
export const createAuthorization = async (req: Request, res: Response) => {
  try {
    const newRequest = await createAuthRequestInDB(req.body);
    return res.status(201).json({
      success: true,
      message: "Authorization request created successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to get all requests
export const getAllAuthorization = async (req: Request, res: Response) => {
  try {
    const requests = await getAllRequestsInDB();
    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to get requests by patient ID
export const getAuthorizationByPatient = async (
  req: Request,
  res: Response
) => {
  try {
    const patientId = req.params.patientId;
    const requests = await getRequestsByPatientInDB(patientId);
    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to update the status of a request
export const updateAuthorizationStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await changeRequestStatusInDB(id, status);
    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

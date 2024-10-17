import { CreateAuthRequestType } from "../types/authRequest";
import {
  createAuthRequest,
  getAllAuthorizationRequests,
  getRequestsByPatientId,
  updateRequestStatus,
} from "../repository/authRequest";
import { IAuthorizationRequest } from "../model/authorization";
import mongoose from "mongoose";

export const createAuthRequestInDB = async (
  requestData: IAuthorizationRequest
) => {
  return await createAuthRequest(requestData);
};

// Service to get all authorization requests
export const getAllRequestsInDB = async () => {
  return getAllAuthorizationRequests();
};

// Service to get requests by patient ID
export const getRequestsByPatientInDB = async (patientId: string) => {
  return getRequestsByPatientId(patientId);
};

// Service to update the status of a request
export const changeRequestStatusInDB = async (
  requestId: string,
  status: "pending" | "approved" | "denied"
) => {
  return updateRequestStatus(requestId, status);
};

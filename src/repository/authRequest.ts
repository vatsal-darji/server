import AuthorizationRequest, {
  IAuthorizationRequest,
} from "../model/authorization";

export const createAuthRequest = async (requestData: IAuthorizationRequest) => {
  return await AuthorizationRequest.create(requestData);
};

// Get all authorization requests
export const getAllAuthorizationRequests = async (): Promise<
  IAuthorizationRequest[]
> => {
  return AuthorizationRequest.find().populate("patientId");
};

// Get requests by patient ID
export const getRequestsByPatientId = async (
  patientId: string
): Promise<IAuthorizationRequest[]> => {
  return AuthorizationRequest.find({ patientId }).populate("patientId");
};

// Update the status of a request
export const updateRequestStatus = async (
  requestId: string,
  status: "pending" | "approved" | "denied"
): Promise<IAuthorizationRequest | null> => {
  return AuthorizationRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );
};

import mongoose, { Schema, Document } from "mongoose";

// Define the AuthorizationRequest interface
export interface IAuthorizationRequest extends Document {
  patientId: mongoose.Types.ObjectId; // Reference to the patient
  treatment: string;
  doctorsNotes: string;
  status: "pending" | "approved" | "denied"; // Enum for status
}

// Create the AuthorizationRequest schema
const AuthorizationRequestSchema: Schema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    treatment: { type: String, required: true },
    doctorsNotes: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the AuthorizationRequest model
const AuthorizationRequest = mongoose.model<IAuthorizationRequest>(
  "AuthorizationRequest",
  AuthorizationRequestSchema
);

export default AuthorizationRequest;

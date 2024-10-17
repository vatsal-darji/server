import mongoose from "mongoose";

export interface CreateAuthRequestType {
  patientId: mongoose.Types.ObjectId;
  treatment: string;
  doctorsNotes: string;
  status?: "pending" | "approved" | "denied";
}

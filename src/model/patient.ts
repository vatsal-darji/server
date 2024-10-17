import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IPatient extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  condition: string;
  medicalHistory: string[];
  treatment_plan: string;
  role: "admin" | "provider" | "patient";
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: { type: [String], default: [] },
  treatment_plan: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "provider", "patient"],
    default: "patient",
    required: true,
  },
});

PatientSchema.pre("save", async function (next) {
  const patient = this as unknown as IPatient;

  if (patient.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);
  }

  next();
});

// Hash password before updating (beforeUpdate)
PatientSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IPatient>;

  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update); // Update the document with the hashed password
  }

  next();
});

// Compare candidate password with the hashed password
PatientSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};
export const Patient = mongoose.model<IPatient>("Patient", PatientSchema);
export type { IPatient };

import { Patient, IPatient } from "../model/patient";

export const getAllPatients = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const patients = await Patient.find({ role: "patient" })
    .skip(skip)
    .limit(limit)
    .exec();
  const totalPatients = await Patient.countDocuments(); // Total count of patients

  return {
    patients,
    totalPatients,
    totalPages: Math.ceil(totalPatients / limit),
    currentPage: page,
  };
};

export const getPatientByEmail = async (email: string) => {
  return await Patient.findOne({ email: email });
};

export const updatePatient = async (
  email: string,
  patientData: Partial<IPatient>
) => {
  return await Patient.findByIdAndUpdate(email, patientData, { new: true });
};

export const deletePatient = async (email: string) => {
  return await Patient.findByIdAndDelete({ email: email });
};

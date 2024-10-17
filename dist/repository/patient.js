"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.getPatientByEmail = exports.getAllPatients = void 0;
const patient_1 = require("../model/patient");
const getAllPatients = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const patients = yield patient_1.Patient.find({ role: "patient" })
        .skip(skip)
        .limit(limit)
        .exec();
    const totalPatients = yield patient_1.Patient.countDocuments(); // Total count of patients
    return {
        patients,
        totalPatients,
        totalPages: Math.ceil(totalPatients / limit),
        currentPage: page,
    };
});
exports.getAllPatients = getAllPatients;
const getPatientByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield patient_1.Patient.findOne({ email: email });
});
exports.getPatientByEmail = getPatientByEmail;
const updatePatient = (email, patientData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield patient_1.Patient.findByIdAndUpdate(email, patientData, { new: true });
});
exports.updatePatient = updatePatient;
const deletePatient = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield patient_1.Patient.findByIdAndDelete({ email: email });
});
exports.deletePatient = deletePatient;

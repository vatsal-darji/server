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
exports.updatePatient = exports.deletePatient = exports.getOnePatientByEmail = exports.getAllPatients = void 0;
const patient_1 = require("../service/patient");
// Get all patients
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield (0, patient_1.getAllPatientsInDB)(page, limit);
        return res.status(200).json({
            success: true,
            data: result.patients,
            meta: {
                totalPatients: result.totalPatients,
                totalPages: result.totalPages,
                currentPage: result.currentPage,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.getAllPatients = getAllPatients;
// Get one patient by email
const getOnePatientByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const patient = yield (0, patient_1.findPatientByEmailInDB)(email);
        return res.status(200).json({
            success: true,
            data: patient,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.getOnePatientByEmail = getOnePatientByEmail;
// Delete a patient
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield (0, patient_1.deletePatientInDB)(email);
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.deletePatient = deletePatient;
// Update a patient
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const patientPayload = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            condition: req.body.condition,
            medicalHistory: req.body.medicalHistory,
            role: req.body.role || "patient", // Default to 'patient'
        };
        const updatedPatient = yield (0, patient_1.updatePatientInDB)(email, patientPayload);
        return res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            data: updatedPatient,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.updatePatient = updatePatient;

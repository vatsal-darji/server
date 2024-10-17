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
exports.deletePatientInDB = exports.updatePatientInDB = exports.findPatientByEmailInDB = exports.getAllPatientsInDB = void 0;
const patient_1 = require("../repository/patient");
const getAllPatientsInDB = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, patient_1.getAllPatients)(page, limit);
});
exports.getAllPatientsInDB = getAllPatientsInDB;
const findPatientByEmailInDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield (0, patient_1.getPatientByEmail)(email);
    if (!patient)
        throw new Error("Patient not found");
    return patient;
});
exports.findPatientByEmailInDB = findPatientByEmailInDB;
const updatePatientInDB = (email, patientData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, patient_1.updatePatient)(email, patientData);
});
exports.updatePatientInDB = updatePatientInDB;
const deletePatientInDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, patient_1.deletePatient)(email);
});
exports.deletePatientInDB = deletePatientInDB;

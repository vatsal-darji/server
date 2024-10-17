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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerNewPatientInDB = exports.validatePatient = void 0;
const patient_1 = require("../model/patient");
const auth_1 = require("../repository/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validatePatient = (patient) => __awaiter(void 0, void 0, void 0, function* () {
    const getPatient = yield patient_1.Patient.findOne({
        email: patient.email,
    });
    if (!getPatient) {
        throw new Error("Invalid credentials"); // Return if the patient does not exist
    }
    const isMatch = yield bcrypt_1.default.compare(patient.password, getPatient.password);
    if (!isMatch) {
        throw new Error("Invalid credentials"); // Return if password does not match
    }
    // Exclude password from the returned patient data
    const _a = getPatient.toObject(), { password } = _a, result = __rest(_a, ["password"]); // Use toObject to convert mongoose document to plain object
    return result; // Return the patient object excluding the password
});
exports.validatePatient = validatePatient;
const registerNewPatientInDB = (patientData) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_1.Patient.findOne({
        email: patientData.email,
    });
    if (patient) {
        throw new Error("user is already exists");
    }
    return yield (0, auth_1.registerPatient)(patientData);
});
exports.registerNewPatientInDB = registerNewPatientInDB;
const login = (patient) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        id: patient._id,
        email: patient.email,
        role: patient.role,
    }; // Include id
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
    });
    console.log("Generated Token Payload: ", payload);
    return {
        access_token: token,
    };
});
exports.login = login;

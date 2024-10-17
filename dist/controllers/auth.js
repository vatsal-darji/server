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
exports.loginPatient = exports.createPatient = void 0;
const auth_1 = require("../service/auth");
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            condition: req.body.condition,
            medicalHistory: req.body.medicalHistory,
            treatment_plan: req.body.treatment_plan,
            role: req.body.role || "patient", // Default to 'patient'
        };
        const patient = yield (0, auth_1.registerNewPatientInDB)(userPayload);
        return res.status(201).json({
            success: true,
            message: "Patient created successfully!",
            data: patient,
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
exports.createPatient = createPatient;
const loginPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const patient = yield (0, auth_1.validatePatient)({ email, password });
        const token = (yield (0, auth_1.login)(patient)).access_token;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                patient: {
                    name: patient.name,
                    email: patient.email,
                    role: patient.role,
                },
            },
        });
    }
    catch (error) {
        console.error("Login error: ", error.message); // Log specific error message
        return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong during login.",
            data: null,
        });
    }
});
exports.loginPatient = loginPatient;

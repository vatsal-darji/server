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
exports.updateAuthorizationStatus = exports.getAuthorizationByPatient = exports.getAllAuthorization = exports.createAuthorization = void 0;
const authRequest_1 = require("../service/authRequest");
// Controller to create a new request
const createAuthorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRequest = yield (0, authRequest_1.createAuthRequestInDB)(req.body);
        return res.status(201).json({
            success: true,
            message: "Authorization request created successfully",
            data: newRequest,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.createAuthorization = createAuthorization;
// Controller to get all requests
const getAllAuthorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield (0, authRequest_1.getAllRequestsInDB)();
        return res.status(200).json({
            success: true,
            data: requests,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.getAllAuthorization = getAllAuthorization;
// Controller to get requests by patient ID
const getAuthorizationByPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        const requests = yield (0, authRequest_1.getRequestsByPatientInDB)(patientId);
        return res.status(200).json({
            success: true,
            data: requests,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.getAuthorizationByPatient = getAuthorizationByPatient;
// Controller to update the status of a request
const updateAuthorizationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedRequest = yield (0, authRequest_1.changeRequestStatusInDB)(id, status);
        return res.status(200).json({
            success: true,
            message: "Request status updated successfully",
            data: updatedRequest,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.updateAuthorizationStatus = updateAuthorizationStatus;

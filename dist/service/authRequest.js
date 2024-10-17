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
exports.changeRequestStatusInDB = exports.getRequestsByPatientInDB = exports.getAllRequestsInDB = exports.createAuthRequestInDB = void 0;
const authRequest_1 = require("../repository/authRequest");
const createAuthRequestInDB = (requestData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, authRequest_1.createAuthRequest)(requestData);
});
exports.createAuthRequestInDB = createAuthRequestInDB;
// Service to get all authorization requests
const getAllRequestsInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, authRequest_1.getAllAuthorizationRequests)();
});
exports.getAllRequestsInDB = getAllRequestsInDB;
// Service to get requests by patient ID
const getRequestsByPatientInDB = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, authRequest_1.getRequestsByPatientId)(patientId);
});
exports.getRequestsByPatientInDB = getRequestsByPatientInDB;
// Service to update the status of a request
const changeRequestStatusInDB = (requestId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, authRequest_1.updateRequestStatus)(requestId, status);
});
exports.changeRequestStatusInDB = changeRequestStatusInDB;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatus = exports.getRequestsByPatientId = exports.getAllAuthorizationRequests = exports.createAuthRequest = void 0;
const authorization_1 = __importDefault(require("../model/authorization"));
const createAuthRequest = (requestData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authorization_1.default.create(requestData);
});
exports.createAuthRequest = createAuthRequest;
// Get all authorization requests
const getAllAuthorizationRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    return authorization_1.default.find().populate("patientId");
});
exports.getAllAuthorizationRequests = getAllAuthorizationRequests;
// Get requests by patient ID
const getRequestsByPatientId = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return authorization_1.default.find({ patientId }).populate("patientId");
});
exports.getRequestsByPatientId = getRequestsByPatientId;
// Update the status of a request
const updateRequestStatus = (requestId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return authorization_1.default.findByIdAndUpdate(requestId, { status }, { new: true });
});
exports.updateRequestStatus = updateRequestStatus;

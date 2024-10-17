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
const express_1 = require("express");
const authRequest_1 = require("../controllers/authRequest");
const authRequestRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/request/createRequest:
 *   post:
 *     summary: Create a new authorization request
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "64a7c3f8f90b430012345678"
 *               treatment:
 *                 type: string
 *                 example: "Physical Therapy"
 *               doctorsNotes:
 *                 type: string
 *                 example: "Patient needs 6 sessions."
 *     responses:
 *       201:
 *         description: Authorization request created successfully
 *       500:
 *         description: Internal Server Error
 */
// Create a new authorization request
authRequestRouter.post("/createRequest", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authRequest_1.createAuthorization)(req, res);
}));
/**
 * @swagger
 * /api/request/all:
 *   get:
 *     summary: Get all authorization requests
 *     tags: [Authorization]
 *     responses:
 *       200:
 *         description: List of all authorization requests
 *       500:
 *         description: Internal Server Error
 */
// Get all authorization requests
authRequestRouter.get("/allRequest", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authRequest_1.getAllAuthorization)(req, res);
}));
/**
 * @swagger
 * /api/request/patient/{patientId}:
 *   get:
 *     summary: Get all requests for a specific patient
 *     tags: [Authorization]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64a7c3f8f90b430012345678"
 *     responses:
 *       200:
 *         description: List of authorization requests for the patient
 *       500:
 *         description: Internal Server Error
 */
// Get requests by patient ID
authRequestRouter.get("/patient/:patientId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authRequest_1.getAuthorizationByPatient)(req, res);
}));
/**
 * @swagger
 * /api/request/{id}/status:
 *   put:
 *     summary: Update the status of an authorization request
 *     tags: [Authorization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64a7c3f8f90b430012345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, denied]
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *       500:
 *         description: Internal Server Error
 */
// Update the status of a request
authRequestRouter.put("/:id/status", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authRequest_1.updateAuthorizationStatus)(req, res);
}));
exports.default = authRequestRouter;

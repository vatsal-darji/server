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
const patient_1 = require("../controllers/patient");
const patientRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/patients/all:
 *   get:
 *     summary: Get a list of all patients with pagination.
 *     description: Retrieve a paginated list of patients.
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of patients to retrieve per page (default is 10).
 *     responses:
 *       200:
 *         description: A list of patients with pagination meta data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6523c1d5bc78d1f23b16e88a
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       age:
 *                         type: integer
 *                         example: 35
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalPatients:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 data:
 *                   type: null
 */
patientRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, patient_1.getAllPatients)(req, res);
}));
/**
 * @swagger
 * /api/patients/:email:
 *   get:
 *     summary: Get a patient by email
 *     tags: [Patients]
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: The email of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A patient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: integer
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
patientRouter.get("/getOne", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, patient_1.getOnePatientByEmail)(req, res);
}));
/**
 * @swagger
 * /api/patients/:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: The ID of the patient
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
patientRouter.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, patient_1.deletePatient)(req, res);
}));
/**
 * @swagger
 * /api/patients/{email}:
 *   put:
 *     summary: Update a patient
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the patient
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               condition:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
patientRouter.put("/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, patient_1.updatePatient)(req, res);
}));
exports.default = patientRouter;

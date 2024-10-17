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
const auth_1 = require("../controllers/auth");
const auth = (0, express_1.Router)();
// Route for patient registration
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new patient
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *               condition:
 *                 type: string
 *               treatment_plan\:
 *                 type: string
 *               medicalHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       500:
 *         description: Server error
 */
auth.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.createPatient)(req, res);
}));
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a patient
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 patient:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
// Route for patient login
auth.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.loginPatient)(req, res);
}));
exports.default = auth;

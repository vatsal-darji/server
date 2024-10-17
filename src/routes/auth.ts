import { Router, Request, Response } from "express";
import { createPatient, loginPatient } from "../controllers/auth";

const auth = Router();

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

auth.post("/register", async (req: Request, res: Response) => {
  await createPatient(req, res);
});

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
auth.post("/login", async (req: Request, res: Response) => {
  await loginPatient(req, res);
});

export default auth;

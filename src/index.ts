import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { swaggerUi, swaggerDocs } from "./swagger";
// import patientRoutes from "./routes/patient.routes";

import auth from "./routes/auth";
import patientRouter from "./routes/patient";
import authRequestRouter from "./routes/authRequest";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", auth);
app.use("/api/patients", patientRouter);
app.use("/api/request", authRequestRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const swagger_1 = require("./swagger");
// import patientRoutes from "./routes/patient.routes";
const auth_1 = __importDefault(require("./routes/auth"));
const patient_1 = __importDefault(require("./routes/patient"));
const authRequest_1 = __importDefault(require("./routes/authRequest"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerDocs));
app.use("/api/auth", auth_1.default);
app.use("/api/patients", patient_1.default);
app.use("/api/request", authRequest_1.default);
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

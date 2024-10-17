"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
            data: null,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Validate the token
        req.user = decoded; // Attach the decoded payload to the request object
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid token.",
            data: null,
        });
    }
};
exports.authMiddleware = authMiddleware;

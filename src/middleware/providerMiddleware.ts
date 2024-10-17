import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

export const providerRoleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (decoded.role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers are allowed.",
      });
    }

    // Store decoded user information in request object for further use
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Role Middleware Error: ", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

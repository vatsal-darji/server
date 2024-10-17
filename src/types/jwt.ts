import { Request } from "express";

// // Define the structure of the JWT payload
// export interface IPayload {
//   id: string;
//   role: "admin" | "provider" | "patient";
// }

// // Extend the Request interface to include the user property
// declare global {
//   namespace Express {
//     interface Request {
//       patient?: IPayload;
//     }
//   }
// }

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
}

import { Request } from "express";

export interface extendedRequest extends Request {
    userId?: string,
    role?: string
}
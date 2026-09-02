import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { NextFunction, Request, Response } from "express";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Convert Node/Express headers to the format expected by Better Auth
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    // If no active session is found, block the request
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    // Attach user and session context to res.locals for access down the chain
    res.locals.user = session.user;
    res.locals.session = session.session;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during auth." });
  }
};

import { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

const validateSchema =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((err) => {
            return { field: err.path[0], error: err.message };
          }),
        );
      }
      next(error);
    }
  };

export default validateSchema;

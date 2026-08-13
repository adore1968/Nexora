import { ZodError } from "zod";

const validateSchema = (schema) => (req, res, next) => {
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

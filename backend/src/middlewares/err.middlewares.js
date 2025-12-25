import { ApiError } from "../utils/apiError.js";

/**
 * Global Error Handling Middleware
 * ----------------------------------
 * This middleware catches *all* errors thrown in the application
 * and converts them into clean JSON responses for the frontend.
 *
 * Without this:
 *   Express sends ugly HTML error pages with stack traces.
 * With this:
 *   Frontend always receives predictable JSON:
 *
 *   {
 *     success: false,
 *     message: "User is not signed Up"
 *   }
 *
 * This middleware must ALWAYS be registered *after all routes*.
 */
export const errorHandler = (err, req, res, next) => {

  /**
   * If the error was thrown using our custom ApiError class,
   * we already know:
   *   - correct status code
   *   - human readable message
   *   - any optional error details
   */
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || []
    });
  }

  /**
   * If the error is not an ApiError (unexpected crash, coding bug, etc),
   * we DO NOT expose internal details to the frontend.
   *
   * This prevents:
   *   - leaking stack traces
   *   - exposing server internals
   */
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};

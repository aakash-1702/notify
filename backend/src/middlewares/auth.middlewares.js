import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import USERS from "../schemas/user.schema.js";

const authenticatedUser = async (req, res, next) => {
  /**
   * ----------------------------------------------------
   * 1️⃣ Read tokens from cookies
   * ----------------------------------------------------
   */
  const accessToken = req.cookies?.accessToken || null;
  const refreshToken = req.cookies?.refreshToken || null;

  // Refresh token is mandatory for authentication
  if (!refreshToken) {
    throw new ApiError(401, "User is not logged in, please login again");
  }

  /**
   * ----------------------------------------------------
   * 2️⃣ Try verifying ACCESS TOKEN
   * ----------------------------------------------------
   * - If valid → authenticate user and exit
   * - If invalid/expired → fallback to refresh token
   */
  let decodedAccessToken = null;

  if (accessToken) {
    try {
      decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
    } catch (error) {
      decodedAccessToken = null;
    }
  }

  if (decodedAccessToken) {
    const user = await USERS.findById(
      decodedAccessToken._id,
      { userName: 1, email: 1 }
    );

    if (!user) {
      throw new ApiError(401, "User does not exist, please login again");
    }

    req.user = user;
    return next(); // ✅ authenticated via access token
  }

  /**
   * ----------------------------------------------------
   * 3️⃣ Verify REFRESH TOKEN
   * ----------------------------------------------------
   */
  let decodedRefreshToken = null;

  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token, please login again");
  }

  /**
   * ----------------------------------------------------
   * 4️⃣ Validate refresh token against DB
   * ----------------------------------------------------
   */
  const user = await USERS.findById(
    decodedRefreshToken._id,
    { userName: 1, email: 1, refreshToken: 1 }
  );

  if (!user) {
    throw new ApiError(401, "Invalid refresh token, please login again");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Refresh token mismatch, please login again");
  }

  /**
   * ----------------------------------------------------
   * 5️⃣ Generate NEW ACCESS TOKEN
   * ----------------------------------------------------
   */
  const newAccessToken = user.generateAccessToken();

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  req.user = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
  };

  return next(); // ✅ authenticated via refresh token
};

export default authenticatedUser;

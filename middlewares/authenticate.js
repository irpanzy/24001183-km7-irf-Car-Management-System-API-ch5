const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return res.status(401).json({
          status: "failed",
          message: "Token is missing or invalid",
          isSuccess: false,
          data: null,
        });
      }

      const token = bearerToken.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(payload.userId);

      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "User not found",
          isSuccess: false,
          data: null,
        });
      }

      if (allowedRoles.includes(user.role)) {
        req.user = user;
        return next();
      } else {
        return res.status(403).json({
          status: "failed",
          message: "Access denied: insufficient permissions",
          isSuccess: false,
          data: null,
        });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "failed",
          message: "Token has expired",
          isSuccess: false,
          data: null,
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          status: "failed",
          message: "Token is invalid",
          isSuccess: false,
          data: null,
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "Internal server error",
        isSuccess: false,
        data: null,
      });
    }
  };
};
const rate_limiter = require("express-rate-limit");

// set limit to 5 requests per minute
const rateLimitMiddleware = rate_limiter({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests",
  status: 429
});

module.exports = rateLimitMiddleware;
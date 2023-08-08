function loggingMiddleware(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

function errorHandlerMiddleware(err, req, res, next) {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Algo salió mal en el servidor." });
}

module.exports = {
  loggingMiddleware,
  errorHandlerMiddleware,
};

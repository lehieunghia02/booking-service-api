const { logger } = require('../config/logging');

const loggerMiddleware = (req, res, next) => {
  // Log request
  logger.info({
    message: 'Incoming request',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user ? req.user._id : 'unauthenticated',
    body: req.method === 'POST' || req.method === 'PUT' ? req.body : undefined
  });

  // Lưu thời gian bắt đầu
  const startTime = new Date();

  // Lưu phương thức res.send gốc
  const originalSend = res.send;

  // Override phương thức res.send để ghi log response
  res.send = function (body) {
    // Tính thời gian xử lý
    const responseTime = new Date() - startTime;

    // Ghi log response
    logger.info({
      message: 'Outgoing response',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${responseTime}ms`,
      userId: req.user ? req.user._id : 'unauthenticated',
      response: typeof body === 'string' ? body.substring(0, 200) : undefined
    });

    // Gọi phương thức gốc
    originalSend.call(this, body);
  };

  next();
};

module.exports = loggerMiddleware;
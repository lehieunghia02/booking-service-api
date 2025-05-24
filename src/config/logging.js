const winston = require('winston');
const { createStream } = require('rotating-file-stream');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục logs tồn tại
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Tạo stream ghi log với rotation
const accessLogStream = createStream('access.log', {
  interval: '1d', // Xoay vòng mỗi ngày
  path: logsDir,
  size: '10M', // Giới hạn kích thước mỗi file log
  compress: 'gzip' // Nén các file log cũ
});

// Tạo winston logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'booking-service' },
  transports: [
    // Ghi tất cả log từ error trở lên vào file error.log
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'), 
      level: 'error' 
    }),
    // Ghi tất cả các level log vào file combined.log
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log') 
    })
  ]
});

// Thêm console transport cho môi trường development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Tạo một stream để Morgan sử dụng với Winston
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// Format Morgan riêng cho API request
const morganApiFormat = (tokens, req, res) => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    contentLength: tokens.res(req, res, 'content-length'),
    responseTime: tokens['response-time'](req, res) + ' ms',
    userAgent: tokens['user-agent'](req, res),
    ip: tokens['remote-addr'](req, res),
    userId: req.user ? req.user._id : 'unauthenticated'
  });
};

module.exports = {
  logger,
  accessLogStream,
  morganApiFormat
};
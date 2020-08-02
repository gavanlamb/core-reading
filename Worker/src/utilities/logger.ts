import pino from 'pino';

const parentLogger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL || 'debug',
});

const logger = parentLogger.child({
  ProjectId: process.env.PROJECT_ID,
  BuildNumber: process.env.BUILD_NUMBER,
  ServiceName: process.env.SERVICE_NAME,
  Environment: process.env.NODE_ENV,
});

export default logger;

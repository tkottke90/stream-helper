import { Container } from '@decorators/di';
import express from 'express';

type tempLevels = 'debug' | 'info' | 'error' | 'fatal';

interface ILoggerService<Levels extends string> {
  log: (
    level: Levels,
    message: string,
    metadata?: Record<string, unknown>
  ) => void;
  error: (error: Error) => void;
}

export class LoggerService implements ILoggerService<tempLevels> {
  private readonly logMetadata: Record<string, unknown> = {};

  constructor(logMetadata?: Record<string, unknown>) {
    if (logMetadata) {
      this.logMetadata = logMetadata;
    }
  }

  log(
    level: tempLevels,
    message: string,
    metadata: Record<string, unknown> = {}
  ) {
    const metadataStr = JSON.stringify(
      Object.assign(this.logMetadata, metadata)
    );

    console.log(
      `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} ${metadataStr}`
    );
  }

  error(error: Error) {
    this.log('info', error.message);

    if (error.stack) {
      console.log(error.stack);
    }
  }

  /**
   * Create a logger with scope of a request
   * @param res Express Response object
   * @returns Logger with metadata configured
   */
  requestLogger(res: express.Response) {
    return new LoggerService({ request: res.locals?.requestId });
  }
}

Container.provide([{ provide: 'LoggerService', useClass: LoggerService }]);

export default new LoggerService();

import { Inject } from '@decorators/di';
import { Controller, Get, Request, Response } from '@decorators/express';
import express from 'express';
import path from 'path';
import { JS_MODULES } from '../routes';
import { FileService } from '../services/file.service';
import { LoggerService } from '../services/logger.service';

@Controller(JS_MODULES.fullPath)
export class JSModulesController {
  protected name = 'JS Modules';

  constructor(
    @Inject('FileService') private readonly fileService: FileService,
    @Inject('LoggerService') private readonly logger: LoggerService
  ) {}

  @Get('/*.js(.map)?')
  getRoot(@Request() req: express.Request, @Response() res: express.Response) {
    const logger = this.logger.requestLogger(res);

    res.header('Content-Type', 'application/javascript');

    this.fileService
      .getFile(path.resolve(`./data/js/${req.path}`), logger)
      .pipe(res);
  }
}

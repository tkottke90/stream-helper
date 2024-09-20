import { Inject } from '@decorators/di';
import { Controller, Get, Response } from '@decorators/express';
import express from 'express';
import { basename } from 'path';
import { ASSETS, HTML_ASSET } from '../routes';
import { AssetFile, FileService } from '../services/file.service';
import { LoggerService } from '../services/logger.service';
import { createHostStr } from '../utilities/express.util';

@Controller(ASSETS.fullPath)
export class StreamAssetsController {
  protected name = 'Stream Assets';

  constructor(
    @Inject('FileService') private readonly fileService: FileService,
    @Inject('LoggerService') private readonly logger: LoggerService
  ) {}

  @Get('/')
  async getFilesInDir(@Response() res: express.Response) {
    const logger = this.logger.requestLogger(res);
    logger.log('info', 'Fetching files');

    const files = await this.fileService.listFiles(/(.*\.html)/);

    res.json({
      files: files.map((file) => this.addLinks(res.req, file)),
      links: {
        self: createHostStr(res.req) + ASSETS.path
      }
    });
  }

  @Get(HTML_ASSET.path)
  async getHtmlFile(@Response() res: express.Response) {
    const logger = this.logger.requestLogger(res);

    logger.log('info', 'Fetching HTML File', { name: res.req.path });
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    this.fileService
      .getFileFromStorage(basename(res.req.path), logger)
      .pipe(res);
  }

  private addLinks(req: express.Request, file: AssetFile) {
    return file.toDTO({
      self: createHostStr(req) + ASSETS.url() + '/' + basename(file.path),
      parent: createHostStr(req) + ASSETS.url()
    });
  }
}

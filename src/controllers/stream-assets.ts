import { Inject } from '@decorators/di';
import { Controller, Get, Response } from '@decorators/express';
import express from 'express';
import { basename } from 'path';
import { ASSETS } from '../routes';
import { AssetFile, FileService } from '../services/file.service';
import { LoggerService } from '../services/logger.service';
import { createHostStr } from '../utilities/express.util';

@Controller(ASSETS.path)
export class StreamAssetsController {
  constructor(
    @Inject('FileService') private readonly fileService: FileService,
    @Inject('LoggerService') private readonly logger: LoggerService
  ) {}

  @Get('/')
  async getFilesInDir(@Response() res: express.Response) {
    this.logger.log('info', 'Fetching files');
    res.json({
      files: this.addLinks(res.req, await this.fileService.listFiles()),
      links: {
        self: createHostStr(res.req) + ASSETS.path
      }
    });
  }

  @Get('/*.html')
  async getFile(@Response() res: express.Response) {
    this.logger.log('info', 'Fetching HTML File', { name: res.req.path });

    res.json({ ...res.req });
  }

  private addLinks(req: express.Request, files: AssetFile[]) {
    return files.map((file) =>
      file.toDTO({
        self: createHostStr(req) + ASSETS.url() + '/' + basename(file.path),
        parent: createHostStr(req) + ASSETS.url()
      })
    );
  }
}

import { Inject } from '@decorators/di';
import { Controller, Get, Response, Request } from '@decorators/express';
import express from 'express';
import { basename, resolve } from 'path';
import { ASSETS, HTML_ASSET } from '../routes';
import { AssetFile, FileService, HtmlFile } from '../services/file.service';
import { LoggerService } from '../services/logger.service';
import { createHostStr } from '../utilities/express.util';

@Controller(ASSETS.path)
export class StreamAssetsController {
  protected name = 'Stream Assets';

  constructor(
    @Inject('FileService') private readonly fileService: FileService,
    @Inject('LoggerService') private readonly logger: LoggerService
  ) {}

  @Get('/view')
  async returnListView(@Response() res: express.Response) {
    res.sendFile(resolve('./src/templates/stream-assets-view.template.html'));
  }

  @Get(HTML_ASSET.path)
  async getHtmlFile(@Response() res: express.Response) {
    const logger = this.logger.requestLogger(res, 'getHtmlFile');

    logger.log('info', 'Fetching HTML File', { name: res.req.path });
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    this.fileService
      .getFileFromStorage(basename(res.req.path), logger)
      .toStream()
      .pipe(res);
  }

  @Get('/')
  async getRouteData(
    @Request() req: express.Request,
    @Response() res: express.Response
  ) {
    const logger = this.logger.requestLogger(res);

    const htmlFileDTO = await this.getHtmlAssets(req, logger);

    logger.log('debug', 'Generating route links & returning JSON');
    res.req.url = ASSETS.fullPath;
    res.json({
      files: htmlFileDTO,
      links: {
        self: createHostStr(res.req) + ASSETS.fullPath
      }
    });
  }

  private addLinks<T extends AssetFile>(req: express.Request, file: T) {
    return {
      self: createHostStr(req) + ASSETS.url() + '/' + basename(file.path),
      parent: createHostStr(req) + ASSETS.url()
    };
  }

  private async getHtmlAssets(req: express.Request, logger: LoggerService) {
    logger.log('debug', 'Fetching files', {
      storageLocation: this.fileService.storageLocation
    });
    const files = await this.fileService.listFiles(/(.*\.html)/);

    logger.log('debug', 'Generating HTML File DTO', {
      htmlFiles: files.length
    });
    const htmlFileDTO = await Promise.all(
      files.map(async (file) => {
        const htmlFile = await HtmlFile.fromAssetFile(file);

        const htmlDTO = htmlFile.toDTO(this.addLinks(req, htmlFile));

        return {
          ...htmlDTO,
          fields: await htmlDTO.fields
        };
      })
    );

    return htmlFileDTO;
  }
}

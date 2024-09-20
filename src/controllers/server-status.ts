import { Controller, Get, Request, Response } from '@decorators/express';
import express from 'express';
import pgk from '../../package.json';
import { ASSETS } from '../routes';
import { createHostStr } from '../utilities/express.util';

@Controller('/')
export class ServerStatusController {
  @Get('/')
  getRoot(@Request() req: express.Request, @Response() res: express.Response) {
    res.json({
      version: pgk.version,
      services: {
        streamAssets: `${createHostStr(req)}${ASSETS.fullPath}`
      }
    });
  }

  @Get('/healthcheck')
  getHealthcheck(@Response() res: express.Response) {
    res.json({ status: 'OKAY' });
  }
}

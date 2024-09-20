import { Controller, Get, Request, Response } from '@decorators/express';
import express from 'express';
import { JS_MODULES } from '../routes';
import { createHostStr } from '../utilities/express.util';

@Controller(JS_MODULES.fullPath)
export class JSModulesController {
  protected name = 'JS Modules';

  @Get('/*.js')
  getRoot(@Request() req: express.Request, @Response() res: express.Response) {
    res.json({
      route: req.path,
      description: 'Endpoint for browser JS modules',
      links: {
        assets: createHostStr(req) + JS_MODULES.fullPath + '/<filename>.js'
      }
    });
  }
}

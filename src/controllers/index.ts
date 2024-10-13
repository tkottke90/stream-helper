// Controllers manage HTTP requests coming to the system.  Create
// individual controller files in this directory, import them here
// and then add them to the array of controllers in the attach
// controllers method

import { attachControllers } from '@decorators/express';
import { Application, Router } from 'express';
import { HttpEventMiddleware } from '../middleware';
import { API_ROOT } from '../routes';
import { JSModulesController } from './js-modules';
import { ServerStatusController } from './server-status';
import { StreamAssetsController } from './stream-assets';

const controllers = [
  JSModulesController,
  ServerStatusController,
  StreamAssetsController
];

const v1_api = Router();

export default function (app: Application) {
  v1_api.use(HttpEventMiddleware);
  attachControllers(v1_api, controllers);

  app.use(API_ROOT.path, v1_api);
}

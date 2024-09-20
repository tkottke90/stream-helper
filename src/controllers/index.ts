// Controllers manage HTTP requests coming to the system.  Create
// individual controller files in this directory, import them here
// and then add them to the array of controllers in the attach
// controllers method

import { attachControllers } from '@decorators/express';
import { Application } from 'express';
import { JSModulesController } from './js-modules';
import { ServerStatusController } from './server-status';
import { StreamAssetsController } from './stream-assets';

const controllers = [
  JSModulesController,
  ServerStatusController,
  StreamAssetsController
];

export default function (app: Application) {
  attachControllers(app, controllers);
}

import { Route } from '@tkottke/hateos-url-manager';

export const API_ROOT = new Route('api/v1');

export const JS_MODULES = API_ROOT.nest('modules');

export const ASSETS = API_ROOT.nest('stream-assets');
export const HTML_ASSET = ASSETS.nest('*.html');

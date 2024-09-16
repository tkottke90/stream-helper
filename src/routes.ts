import { Route } from '@tkottke/hateos-url-manager';

export const ASSETS = new Route('stream-assets');
export const HTML_ASSET = ASSETS.nest('*.html');

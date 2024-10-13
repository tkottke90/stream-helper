import { htmlSelectors } from '../constants.js';
import { HtmlQueryField } from '../types/html-asset.js';

export function getMetaParams() {
  const metaTag = document.querySelector(htmlSelectors.metaQueryFields);

  if (!metaTag) {
    return {};
  }

  let paramConfig: HtmlQueryField[] = [];
  try {
    // Parse the JSON string and convert it into usable JSON
    paramConfig = JSON.parse(metaTag.getAttribute('content') ?? '');
  } catch (err) {
    // If this fails we should return the empty object
    console.error('Unable to parse configurations');

    return {};
  }

  return getQueryParam(...paramConfig.map((config) => config.name));
}

export function getQueryParam(...keys: string[]) {
  const result: Record<string, string> = {} as Record<string, string>;
  const params = new URLSearchParams(window.location.search);

  for (const key of keys) {
    result[key] = '';

    if (params.has(key)) {
      result[key] = params.get(key) ?? '';
    }
  }

  return result;
}

export function getQueryParam(...keys: string[]) {
  const result: Record<string, string> = {} as Record<string, string>;
  const params = new URLSearchParams(window.location.search);

  for (const key of keys) {
    result[key] = '';

    if (params.has(key)) {
      result[key] = params.get('key') ?? '';
    }
  }

  return result;
}

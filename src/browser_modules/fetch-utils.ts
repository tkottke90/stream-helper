class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;

  constructor(readonly response: Response) {
    super('');

    this.status = response.status;
    this.statusText = response.statusText;
  }
}

export function parseResponse(response: Response) {
  if (!response.ok) {
    throw new HttpError(response);
  }

  const contentType =
    response.headers.get('Content-Type') ?? 'application/octet-stream';

  switch (true) {
    case contentType === 'application/json':
      return response.json();
    case contentType === 'application/octet-stream':
      return response.arrayBuffer();
    case contentType?.startsWith('text/'):
    default:
      return response.text();
  }
}

import { Container } from '@decorators/di';
import { readdir, readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { LoggerService } from './logger.service';

export class AssetFile {
  private _data?: Buffer;

  constructor(readonly name: string, readonly path: string) {}

  async getData() {
    if (!this._data) {
      this._data = await readFile(path.resolve(this.path));
    }

    return this._data;
  }

  toDTO(links: Record<string, string> = {}) {
    return {
      name: this.name,
      path: path.resolve(this.path),
      links
    };
  }
}

export class FileService {
  private readonly storageLocation: string;

  constructor() {
    this.storageLocation = process.env['STORAGE_DIR'] ?? './data';
  }

  async listFiles(filter?: string | RegExp) {
    const list = await readdir(path.resolve(this.storageLocation));

    return list
      .filter((file) => {
        if (!filter) return true;

        if (typeof filter === 'string') {
          return file.includes(filter);
        } else {
          return filter.test(file);
        }
      })
      .map(
        (file) => new AssetFile(file, path.resolve(this.storageLocation, file))
      );
  }

  getFile(filename: string, logger: LoggerService) {
    const filePath = path.resolve(filename);

    logger.log('debug', 'Creating read stream to file', { filePath });
    return createReadStream(filePath);
  }

  getFileFromStorage(filename: string, logger: LoggerService) {
    const filepath = path.resolve(this.storageLocation, filename);

    logger.log('debug', 'Loading file from Storage', { filename });

    return this.getFile(filepath, logger);
  }
}

Container.provide([{ provide: 'FileService', useClass: FileService }]);

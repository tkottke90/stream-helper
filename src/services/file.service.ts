import { Container } from '@decorators/di';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

export class AssetFile {
  private _data?: Buffer;

  constructor(readonly path: string) {}

  async getData() {
    if (!this._data) {
      this._data = await readFile(path.resolve(this.path));
    }

    return this._data;
  }

  toDTO(links: Record<string, string> = {}) {
    return {
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

  async listFiles() {
    const list = await readdir(path.resolve(this.storageLocation));

    return list.map(
      (file) => new AssetFile(path.resolve(this.storageLocation, file))
    );
  }

  getFile(name: string) {
    const files = this.listFiles();
  }
}

Container.provide([{ provide: 'FileService', useClass: FileService }]);

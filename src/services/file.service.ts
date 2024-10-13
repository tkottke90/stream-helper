import { Container } from '@decorators/di';
import { readdir, readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import path, { basename } from 'path';
import { LoggerService } from './logger.service';
import { JSDOM } from 'jsdom';
import { HtmlQueryField } from '../types/html-asset';
import { htmlSelectors } from '../constants';

export class AssetFile {
  protected _data?: Buffer;

  constructor(readonly name: string, readonly path: string) {}

  async getData() {
    if (!this._data) {
      this._data = await readFile(path.resolve(this.path));
    }

    return this._data;
  }

  toStream() {
    return createReadStream(this.path);
  }

  toDTO(links: Record<string, string> = {}) {
    return {
      name: this.name,
      path: path.resolve(this.path),
      links
    };
  }
}

export class HtmlFile extends AssetFile {
  toDTO(links?: Record<string, string>) {
    const baseDTO = super.toDTO(links);

    return {
      name: baseDTO.name,
      path: baseDTO.path,
      links: baseDTO.links,
      fields: this.getQueryFields()
    };
  }

  static async fromAssetFile(asset: AssetFile) {
    return new HtmlFile(asset.name, asset.path);
  }

  async getQueryFields(): Promise<HtmlQueryField[]> {
    let fileData = this._data;

    if (!fileData) {
      fileData = await this.getData();
    }

    const document = JSDOM.fragment(fileData.toString('utf-8'));
    const metadataTag = document.querySelector(htmlSelectors.metaQueryFields);

    if (!metadataTag) {
      return [];
    }

    const content = metadataTag.getAttribute('content');
    if (!content) {
      return [];
    }

    try {
      return JSON.parse(content);
    } catch (err) {
      console.error(
        'Unable to parse Query Fields metadata in header' +
          (err as Error).message
      );
      return [];
    }
  }
}

export class FileService {
  readonly storageLocation: string;

  constructor() {
    this.storageLocation = path.resolve(process.env['STORAGE_DIR'] ?? './data');
  }

  async listFiles(filter?: string | RegExp) {
    const list = await readdir(this.storageLocation);

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

  getFile(filename: string) {
    const filePath = path.resolve(filename);

    return new AssetFile(basename(filename), filePath);
  }

  getFileFromStorage(filename: string, logger: LoggerService) {
    const filepath = path.resolve(this.storageLocation, filename);

    logger.log('debug', 'Loading file from Storage', { filename });

    return this.getFile(filepath);
  }
}

Container.provide([{ provide: 'FileService', useClass: FileService }]);

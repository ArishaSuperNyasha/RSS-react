export class Storage<T extends string> {
  private service: globalThis.Storage;

  constructor(service: globalThis.Storage) {
    this.service = service;
  }

  public getItem(key: T): string | null {
    return this.service.getItem(key);
  }

  public setItem(key: T, value: string): void {
    return this.service.setItem(key, value);
  }
}

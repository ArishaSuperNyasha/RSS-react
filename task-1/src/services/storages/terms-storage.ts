import { Storage } from './storage';

type TermsStorageKeys = 'searchTerms';

class TermsStorageClass<
  T extends string,
> extends Storage<T> {
  constructor(service: globalThis.Storage) {
    super(service);
  }

  public getLastTerm(key: T): string {
    const terms = this.getItem(key);
    if (terms === '' || terms === null) {
      return '';
    } else {
      return (
        terms
          ?.split(/(?<=") (?=")/)
          .map((s) => s.slice(1, s.length - 1))[0] ?? ''
      );
    }
  }
}

const TermsStorage =
  new TermsStorageClass<TermsStorageKeys>(localStorage);

export { TermsStorage };

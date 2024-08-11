import { Storage } from './storage';

type TermsStorageKeys = 'searchTerms';

class TermsStorageClass<
  T extends string,
> extends Storage<T> {
  constructor(service: globalThis.Storage) {
    super(service);
  }

  public getTermsArray(key: T, string?: string): string[] {
    const terms = string ?? this.getItem(key);
    if (terms === '' || terms === null) {
      return [];
    } else {
      return (
        terms
          ?.split(/(?<=") (?=")/)
          .map((s) => s.slice(1, s.length - 1)) ?? []
      );
    }
  }

  public getLastTerm(key: T): string {
    const lastTerm = this.getTermsArray(key)[0];
    if (!lastTerm) {
      return '';
    }

    return lastTerm;
  }

  public addTermAndConvertToString(
    terms: string[],
    newValue: string
  ): string {
    let newString: string;
    if (
      terms.length === 0 ||
      (terms[0] === '' && terms.length === 1)
    ) {
      newString = `"${newValue}"`;
    } else {
      const filteredTems = terms
        .slice(0, 11)
        .filter((s) => s !== newValue)
        .slice(0, 10);
      newString = [newValue, ...filteredTems]
        .map((s) => `"${s}"`)
        .join(' ');
    }

    return newString;
  }
}

const TermsStorage =
  new TermsStorageClass<TermsStorageKeys>(localStorage);

export { TermsStorage };

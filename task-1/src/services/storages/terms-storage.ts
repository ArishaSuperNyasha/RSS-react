import { Storage } from './storage';

type TermsStorageKeys = 'searchTerms';

const TermsStorage = new Storage<TermsStorageKeys>(
  localStorage
);
Object.freeze(TermsStorage);

export { TermsStorage };

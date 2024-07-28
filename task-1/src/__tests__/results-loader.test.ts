import { vi } from 'vitest';
import { resultsLoader } from 'src/loaders';

import 'src/services/storages/terms-storage';

let count = 0;
vi.mock('src/services/storages/terms-storage', () => ({
  TermsStorage: {
    getLastTerm: () => {
      if (count !== 0) {
        return '';
      }
      count += 1;
      return 'Cinderella';
    },
  },
}));

test('Resolves response when path is correct', () => {
  return resultsLoader({
    params: { pageNumber: '1', characterId: undefined },
  }).then((r) =>
    expect(
      Array.isArray(r.data[0].name.match('Cinderella'))
    ).toBe(true)
  );
});

test('Throws ErrorResponse on incorrect page number', () => {
  return resultsLoader({
    params: { pageNumber: 'abc', characterId: undefined },
  }).catch((r) => expect(r.ok).toBe(false));
});

test('Gets all the items if there is no term in the storage', () => {
  return resultsLoader({
    params: { pageNumber: '1', characterId: undefined },
  }).then((r) =>
    expect(
      Array.isArray(r.data[0].name.match('Cinderella'))
    ).toBe(false)
  );
});

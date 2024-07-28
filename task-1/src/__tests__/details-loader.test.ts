import { detailsLoader } from 'src/loaders';

test('Resolves response when path is correct', () => {
  return detailsLoader({
    params: { characterId: '2' },
  }).then((r) => expect(r.info.count).toBe(0));
});

test('Throws ErrorResponse on incorrect id', () => {
  return detailsLoader({
    params: { characterId: undefined },
  }).catch((r) => expect(r.ok).toBe(false));
});

test('Throws ErrorResponse on incorrect path', () => {
  return detailsLoader({
    params: { characterId: '1000000000000000' },
  }).catch((r) => expect(r.ok).toBe(false));
});

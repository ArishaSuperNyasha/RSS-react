import {
  getInputValue,
  pasteValueIntoInput,
} from 'src/views/search-page/utils';

describe('Test for input utils', () => {
  it('pasteValueIntoInput works well', () => {
    const stroke = 'lalala';
    const input = document.createElement('input');
    pasteValueIntoInput(input, stroke);
    expect(input.value).toBe(stroke);
  }),
    it('getInputValue works well', () => {
      const stroke = 'lalala';
      const input = document.createElement('input');
      input.value = 'lalala';
      expect(getInputValue(input)).toBe(stroke);
    });
});

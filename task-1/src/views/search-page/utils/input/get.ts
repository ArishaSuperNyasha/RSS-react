export function getInputValue(
  inputRef: null | HTMLInputElement
): string {
  return inputRef?.value ?? '';
}

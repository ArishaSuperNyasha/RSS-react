export function pasteValueIntoInput(
  inputRef: null | HTMLInputElement,
  stroke: string
): void {
  const inputElement = inputRef;
  if (inputElement) {
    inputElement.value = stroke;
  }
}

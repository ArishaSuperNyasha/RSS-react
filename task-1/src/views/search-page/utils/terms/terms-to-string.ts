export function addTermAndConvertToString(
  terms: string[],
  newValue: string
): string {
  if (
    terms.length === 0 ||
    (terms[0] === '' && terms.length === 1)
  ) {
    return `"${newValue}"`;
  } else {
    const filteredTems = terms
      .slice(0, 11)
      .filter((s) => s !== newValue)
      .slice(0, 10);
    return [newValue, ...filteredTems]
      .map((s) => `"${s}"`)
      .join(' ');
  }
}

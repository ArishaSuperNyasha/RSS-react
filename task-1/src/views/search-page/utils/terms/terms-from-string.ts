export function getTermsFromString(
  stroke: string | null
): string[] {
  if (stroke === '' || stroke === null) {
    return [];
  } else {
    return (
      stroke
        ?.split(/(?<=") (?=")/)
        .map((s) => s.slice(1, s.length - 1)) ?? []
    );
  }
}

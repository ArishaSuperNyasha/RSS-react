import { removeNameFromErrorMess } from '../../../utils';
import { DELETE_ERROR_PHRAZE } from '../../../global-state';

const inputNames = [
  'name',
  'age',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'country',
  'userpic',
  'termsConditionsAgreement',
] as const;

const numberErrorRegexp = new RegExp(/(\w*?) must be a `number` type/);

export function filterErrors(arr: string[]) {
  const numberError = arr.find((i) => i.match(numberErrorRegexp));
  const numberErrorMatch = numberError?.match(numberErrorRegexp);
  if (numberErrorMatch) {
    const name = numberErrorMatch[1];
    const uppercaseName = name[0].toUpperCase().concat(name.slice(1));
    arr.push(`${name}: ${uppercaseName} must be a number type`);
  }

  return inputNames.map((name) => {
    const match = removeNameFromErrorMess(
      arr.find((error) => error.startsWith(`${name}: `))
    );
    return [name, match === '' ? DELETE_ERROR_PHRAZE : match];
  });
}

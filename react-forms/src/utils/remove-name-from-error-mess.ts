export function removeNameFromErrorMess(errMess?: string) {
  return errMess?.replace(/\w*?:/, '') ?? '';
}

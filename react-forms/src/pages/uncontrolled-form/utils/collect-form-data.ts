type formInputsNames =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'gender'
  | 'country';

type FormData = Record<formInputsNames, string> & {
  termsConditionsAgreement: boolean;
  userpic: FileList | null;
};

export function collectFormData(form: HTMLFormElement) {
  const formData: Partial<FormData> = {};

  for (let i = 0; i < form.length; ++i) {
    const input = form[i] as HTMLInputElement;

    switch (input.name) {
      case 'gender':
        if (input.checked) {
          formData.gender = input.value;
        }
        break;
      case 'termsConditionsAgreement':
        formData.termsConditionsAgreement = input.checked;
        break;
      case 'userpic':
        formData.userpic = input.files;
        break;
      case '':
        break;
      default:
        formData[input.name as formInputsNames] = input.value;
        break;
    }
  }

  return formData;
}

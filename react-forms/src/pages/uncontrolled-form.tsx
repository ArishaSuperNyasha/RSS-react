import { useSelector } from 'react-redux';
import { RootState } from '../global-state';
import { formSchema } from '../validations';
import { ValidationError } from 'yup';

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

function collectFormData(form: HTMLFormElement) {
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

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!event.target) {
    return;
  }

  const form = event.target as HTMLFormElement;
  const formData = collectFormData(form);

  try {
    const isValid = await formSchema.validate(formData, { abortEarly: false });

    console.log(isValid);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      console.error(error?.errors);
    }
  }
};

export function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.country.value);

  return (
    <div className="react-hook-form">
      <h1>Uncontrolled form</h1>

      <form onSubmit={onSubmit}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <label>
          Age
          <input type="number" name="age" />
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <label>
          Email
          <input type="text" name="email" />
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <label>
          Password
          <input type="password" name="password" />
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <label>
          Confirm password
          <input type="password" name="confirmPassword" />
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <fieldset>
          <label>
            <input type="radio" value="male" name="gender" defaultChecked />
            Male
          </label>
          <label>
            <input type="radio" value="female" name="gender" />
            Female
          </label>
        </fieldset>

        <label>
          Add userpic
          <input type="file" name="userpic" accept=".png,.jpeg" />
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <label>
          Country
          <input
            list="country-data"
            id="country"
            name="country"
            autoComplete="off"
          />
          <datalist id="country-data">
            {countries.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </datalist>
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <label>
          <input type="checkbox" name="termsConditionsAgreement" />I accept the
          terms of the personal data processing agreement
        </label>
        <div className="error-message">
          <p></p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

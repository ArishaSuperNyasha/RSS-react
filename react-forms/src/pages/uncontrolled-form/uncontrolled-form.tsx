import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../global-state';
import { formSchema } from '../../validations';
import { ValidationError } from 'yup';
import { useRef } from 'react';
import { addCodedUserpic } from '../../utils';
import { DELETE_ERROR_PHRAZE } from '../../global-state';
import { filterErrors, collectFormData } from './utils';
import { addForm } from '../../global-state';
import { useNavigate } from 'react-router-dom';

export function UncontrolledForm() {
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.country.value);
  const dispatch = useDispatch();

  const errorRefsObject = {
    name: useRef<HTMLParagraphElement>(null),
    age: useRef<HTMLParagraphElement>(null),
    email: useRef<HTMLParagraphElement>(null),
    password: useRef<HTMLParagraphElement>(null),
    confirmPassword: useRef<HTMLParagraphElement>(null),
    userpic: useRef<HTMLParagraphElement>(null),
    country: useRef<HTMLParagraphElement>(null),
    termsConditionsAgreement: useRef<HTMLParagraphElement>(null),
  };

  const showErrorsMessages = (arr: (string | undefined)[][]) => {
    arr.forEach((pair) => {
      const name = pair[0];
      if (name && name in errorRefsObject) {
        const refsKey = name as keyof typeof errorRefsObject;
        const paragr = errorRefsObject[refsKey].current;
        if (paragr) {
          if (pair[1] === DELETE_ERROR_PHRAZE) {
            paragr.textContent = '';
          } else {
            paragr.textContent = pair[1] ?? '';
          }
        }
      }
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.target) {
      return;
    }

    const form = event.target as HTMLFormElement;
    const formData = collectFormData(form);

    try {
      await formSchema.validate(formData, { abortEarly: false });

      addCodedUserpic(formData).then((reduxData) => {
        if (reduxData) {
          dispatch(addForm(reduxData));
        }
        navigate('/main');
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const filteredErrors = filterErrors(error.errors);
        showErrorsMessages(filteredErrors);
      }
    }
  };

  return (
    <div className="react-hook-form">
      <h1>Uncontrolled form</h1>

      <form onSubmit={onSubmit}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <div className="error-message">
          <p ref={errorRefsObject.name}></p>
        </div>

        <label>
          Age
          <input type="number" name="age" />
        </label>
        <div className="error-message">
          <p ref={errorRefsObject.age}></p>
        </div>

        <label>
          Email
          <input type="text" name="email" />
        </label>
        <div className="error-message">
          <p ref={errorRefsObject.email}></p>
        </div>

        <label>
          Password
          <input type="password" name="password" />
        </label>
        <div className="error-message">
          <p ref={errorRefsObject.password}></p>
        </div>

        <label>
          Confirm password
          <input type="password" name="confirmPassword" />
        </label>
        <div className="error-message">
          <p ref={errorRefsObject.confirmPassword}></p>
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
          <p ref={errorRefsObject.userpic}></p>
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
          <p ref={errorRefsObject.country}></p>
        </div>

        <label>
          <input type="checkbox" name="termsConditionsAgreement" />I accept the
          terms of the personal data processing agreement
        </label>
        <div className="error-message">
          <p ref={errorRefsObject.termsConditionsAgreement}></p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

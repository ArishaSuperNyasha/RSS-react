import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { formSchema } from '../validations';
import { RootState, addForm } from '../global-state';
import { addCodedUserpic, removeNameFromErrorMess } from '../utils';
import { FormData } from './uncontrolled-form/utils';
import { useNavigate } from 'react-router-dom';

export function ReactHookForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    reset,
  } = useForm({ mode: 'all', resolver: yupResolver(formSchema) });
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.value);

  function onSubmit(formData: unknown) {
    addCodedUserpic(formData as Partial<FormData>).then((reduxData) => {
      if (reduxData) {
        dispatch(addForm(reduxData));
      }
      reset();
      navigate('/main');
    });
  }

  return (
    <div className="react-hook-form">
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input type="text" {...register('name')} />
        </label>
        <div className="error-message">
          <p>{removeNameFromErrorMess(errors.name?.message)}</p>
        </div>

        <label>
          Age
          <input type="number" {...register('age')} />
        </label>
        <div className="error-message">
          <p>{removeNameFromErrorMess(errors.age?.message)}</p>
        </div>

        <label>
          Email
          <input type="text" {...register('email')} />
        </label>
        <div className="error-message">
          <p>{removeNameFromErrorMess(errors.email?.message)}</p>
        </div>

        <label>
          Password
          <input type="password" {...register('password')} />
        </label>
        <div className="error-message">
          <p>
            {removeNameFromErrorMess(errors.password?.message) ||
              (touchedFields.password && 'hard')}
          </p>
        </div>

        <label>
          Confirm password
          <input type="password" {...register('confirmPassword')} />
        </label>
        <div className="error-message">
          <p>{removeNameFromErrorMess(errors.confirmPassword?.message)}</p>
        </div>

        <fieldset>
          <label>
            <input
              {...register('gender')}
              type="radio"
              value="male"
              name="gender"
              defaultChecked
            />
            Male
          </label>
          <label>
            <input
              {...register('gender')}
              type="radio"
              value="female"
              name="gender"
            />
            Female
          </label>
        </fieldset>

        <label>
          Add userpic
          <input type="file" {...register('userpic')} accept=".png,.jpeg" />
        </label>
        <div className="error-message">
          <p>{removeNameFromErrorMess(errors.userpic?.message)}</p>
        </div>

        <label>
          Country
          <input
            {...register('country')}
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
          <p>{removeNameFromErrorMess(errors.country?.message)}</p>
        </div>

        <label>
          <input {...register('termsConditionsAgreement')} type="checkbox" />I
          accept the terms of the personal data processing agreement
        </label>
        <div className="error-message">
          <p>
            {removeNameFromErrorMess(errors.termsConditionsAgreement?.message)}
          </p>
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

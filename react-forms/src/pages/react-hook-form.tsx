import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../validations';

const onSubmit = (data: object) => {
  alert(JSON.stringify(data));
};

export function ReactHookForm() {
  const {
    register,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
  } = useForm({ mode: 'all', resolver: yupResolver(formSchema) });

  return (
    <div className="react-hook-form">
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input type="text" {...register('name')} />
        </label>
        <div className="error-message">
          <p>{errors.name?.message}</p>
        </div>

        <label>
          Age
          <input type="number" {...register('age')} />
        </label>
        <div className="error-message">
          <p>{errors.age?.message}</p>
        </div>

        <label>
          Email
          <input type="text" {...register('email')} />
        </label>
        <div className="error-message">
          <p>{errors.email?.message}</p>
        </div>

        <label>
          Password
          <input type="password" {...register('password')} />
        </label>
        <div className="error-message">
          <p>
            {errors.password?.message || (touchedFields.password && 'hard')}
          </p>
        </div>

        <label>
          Confirm password
          <input type="password" {...register('confirmPassword')} />
        </label>
        <div className="error-message">
          <p>{errors.confirmPassword?.message}</p>
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

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

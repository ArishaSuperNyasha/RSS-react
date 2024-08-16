import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../validations';

const onSubmit = (data: object) => {
  alert(JSON.stringify(data));
};

export function ReactHookForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(formSchema) });

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

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

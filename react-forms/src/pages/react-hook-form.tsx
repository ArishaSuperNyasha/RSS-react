import { useForm } from 'react-hook-form';
import { InputWithValidation } from '../components';

const onSubmit = (data: object) => {
  alert(JSON.stringify(data));
};

export function ReactHookForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  return (
    <div className="react-hook-form">
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithValidation
          {...{
            name: 'name',
            inputType: 'text',
            register,
            registerRule: {
              validate: (v: string) =>
                v.charAt(0) === v.charAt(0).toUpperCase() ||
                'Should start from an uppercase letter',
            },
            errors,
          }}
        />

        <InputWithValidation
          {...{
            name: 'age',
            inputType: 'number',
            register,
            registerRule: {
              min: {
                value: 1,
                message: 'No negative numbers is allowed',
              },
            },
            errors,
          }}
        />

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

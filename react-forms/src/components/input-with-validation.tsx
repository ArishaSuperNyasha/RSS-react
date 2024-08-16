import {
  FieldErrorsImpl,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputWithValidationProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  inputType: React.InputHTMLAttributes<HTMLInputElement>['type'];
  registerRule: RegisterOptions;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: unknown;
    }>
  >;
}

export function InputWithValidation(props: InputWithValidationProps) {
  const { register, name, inputType, registerRule, errors } = props;

  const labelText = name[0].toLocaleUpperCase().concat(name.slice(1));
  const getErrors = () => {
    const errorsDescriptor = Object.getOwnPropertyDescriptor(errors, name);
    return errorsDescriptor?.value as typeof errors.name;
  };
  const renderErrorMessage = () => {
    const errorValue = getErrors();
    return (
      errorValue && (
        <p>{errorValue.message ? errorValue.message.toString() : 'Error'}</p>
      )
    );
  };

  return (
    <>
      <label>
        {labelText}
        <input type={inputType} {...register(name, registerRule)} />
      </label>
      <div className="error-message">{renderErrorMessage()}</div>
    </>
  );
}

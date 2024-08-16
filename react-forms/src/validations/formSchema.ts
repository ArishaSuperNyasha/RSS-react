import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^\p{Lu}/u, 'Should start from an uppercase letter'),
  age: yup.number().min(1, 'No negative numbers is allowed'),
  email: yup.string().email('Should contain actual email'),
});

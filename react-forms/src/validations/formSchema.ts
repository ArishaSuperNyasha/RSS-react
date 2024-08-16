import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^\p{Lu}/u, 'Should start from an uppercase letter'),
  age: yup.number().required().min(1, 'No negative numbers is allowed'),
  email: yup.string().required().email('Should contain actual email'),
  password: yup
    .string()
    .required()
    .matches(
      /(((?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d))|((?=.*[@!#№$%^&*+=?~|\\/])(?=.*\p{Ll})(?=.*\d))|((?=.*[@!#№$%^&*+=?~|\\/])(?=.*\p{Lu})(?=.*\d))|((?=.*[@!#№$%^&*+=?~|\\/])(?=.*\p{Lu})(?=.*\p{Ll})))/u,
      'weak'
    )
    .matches(
      /((?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d))(?=.*[@!#№$%^&*+=?~|\\/])/u,
      'medium'
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string(),
});

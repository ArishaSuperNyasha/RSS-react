import * as yup from 'yup';
import { countryList } from '../global-state/country/counries-list';

const MAX_FILE_SIZE = 3145728;
interface ImageFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

function getExtension(file: ImageFile): string {
  const match = file.name.match(/\.\w*?$/);
  return match ? match[0] : '';
}

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('name: Name is a required field')
    .matches(/^\p{Lu}/u, 'name: Should start from an uppercase letter'),
  age: yup.number().required().min(1, 'age: No negative numbers is allowed'),
  email: yup
    .string()
    .required('email: Email is a required field')
    .email('email: Should contain actual email'),
  password: yup
    .string()
    .required('password: Password is a required field')
    .matches(
      /(((?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d))|((?=.*[@!#№$%^&*+=?~|\\/])(?=.*\p{Ll})(?=.*\d))|((?=.*[@!#№$%^&*+=?~|\\/])(?=.*\p{Lu})(?=.*\d))|((?=.*[@!#№$%^&*+=?~|\\/])(?=.*\p{Lu})(?=.*\p{Ll})))/u,
      'password: weak'
    )
    .matches(
      /((?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d))(?=.*[@!#№$%^&*+=?~|\\/])/u,
      'password: medium'
    ),
  confirmPassword: yup
    .string()
    .required('confirmPassword: Confirm password is a required field')
    .oneOf([yup.ref('password')], 'confirmPassword: Passwords must match'),
  gender: yup.string(),
  userpic: yup
    .mixed()
    .required()
    .test({
      message: 'userpic: Please provide a supported file type (png or jpeg)',
      test: (arr) => {
        const files = arr as ImageFile[];
        if (!files.length) return false;
        const isValid = ['.png', '.jpeg'].includes(
          getExtension(files[0] as ImageFile)
        );
        return isValid;
      },
    })
    .test({
      message: `userpic: File too big, can't exceed ${MAX_FILE_SIZE}b`,
      test: (arr) => {
        const file = (arr as ImageFile[])[0];
        if (!file) return false;
        const isValid = file.size < MAX_FILE_SIZE;
        return isValid;
      },
    }),
  country: yup
    .string()
    .required('country: country is a required field')
    .test({
      message: 'country: Please, choose value from autocomplete',
      test: (value) => {
        return countryList.includes(value);
      },
    }),
  termsConditionsAgreement: yup
    .boolean()
    .required()
    .test({
      message:
        'termsConditionsAgreement: You must accept the terms of the agreement',
      test: (value) => {
        return value;
      },
    }),
});

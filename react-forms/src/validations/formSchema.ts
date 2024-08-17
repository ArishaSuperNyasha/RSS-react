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
  userpic: yup
    .mixed()
    .required()
    .test({
      message: 'Please provide a supported file type (png or jpeg)',
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
      message: `File too big, can't exceed ${MAX_FILE_SIZE}b`,
      test: (arr) => {
        const file = (arr as ImageFile[])[0];
        if (!file) return false;
        const isValid = file.size < MAX_FILE_SIZE;
        return isValid;
      },
    }),
  country: yup
    .string()
    .required()
    .test({
      message: 'Please, choose value from autocomplete',
      test: (value) => {
        return countryList.includes(value);
      },
    }),
});

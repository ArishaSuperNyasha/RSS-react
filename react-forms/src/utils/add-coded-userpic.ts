import { FormData } from '../pages/uncontrolled-form/utils';
import { convertToBase64 } from '.';

export type ReduxFormsState = (Partial<Omit<FormData, 'userpic'>> & {
  userpic: string;
})[];

export async function addCodedUserpic(formData: Partial<FormData>) {
  const files = formData.userpic;
  if (!files) return;
  const codedString = (await convertToBase64(files)) as string;
  const obj: ReduxFormsState[number] = {
    ...formData,
    ...{
      userpic: codedString,
    },
  };
  return obj;
}

export function convertToBase64(files?: FileList | null) {
  if (!files) return new Promise((resolve) => resolve(''));
  const file = files[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

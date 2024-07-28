export const createObjectURL = (data: object): string => {
  return URL.createObjectURL(
    new Blob([JSON.stringify(data)], {
      type: 'text/csv;charset=utf-8',
    })
  );
};

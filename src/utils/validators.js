export const required = value => {
  if (value) return undefined;
  return "Field is required";
};

//Максимальную длину вторым параметром передать нельзя, потому что не мы будем её вызывать, а redux-form
export const maxLengthCreator = maxLength => value => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
  return undefined;
};

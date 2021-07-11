export const ErrorMessages = {
  required: "This field is required",
  incorrect: (field: string): string => `${field} is incorrect`,
  invalid: "Invalid value",
  moreCharacters: (length: number): string =>
    `Must be ${length} or more characters`,
};

import { checkLocationString } from "./inputRegex";

export const validateInput = (inputValue: string) => {
  let error: string = "";
  let value: boolean = true;

  if (inputValue.length === 0) {
    error = "Type in a country.";

    return { error, value };
  }

  if (inputValue.length > 56) {
    error = "Country name is too long.";

    return { error, value };
  }
  if (!checkLocationString(inputValue)) {
    error = "Only letters and spaces are allowed.";

    return { error, value };
  }

  value = false;
  return { error, value };
};
import isEmpty from "../util/isEmpty";
import validator from "validator";

export default function LoginValidation(data: any) {
  const errors: any = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  if (validator.isEmpty(data.email)) {
    errors.email = "required email";
  }

  data.password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(data.password)) {
    errors.password = "required password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

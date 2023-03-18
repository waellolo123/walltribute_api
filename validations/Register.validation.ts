import isEmpty from "../util/isEmpty";
import validator from "validator";

export default function RegisterValidation(data: any) {
  const errors: any = {};

  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  if (validator.isEmpty(data.fullname)) {
    errors.fullname = "required fullname";
  }

  data.email = !isEmpty(data.email) ? data.email : "";
  if (validator.isEmpty(data.email)) {
    errors.email = "required email";
  }

  data.password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(data.password)) {
    errors.password = "required password";
  }

  if (!validator.equals(data.password, data.confirm)) {
    errors.confirm = "passwords not equals";
  }

  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "required confirm";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

import { Request } from "express";
import validator from "validator";
import isEmpty from "../util/isEmpty";

function imageValidation(req: any) {
  const errors: any = {};

  req.body.title = !isEmpty(req.body.title) ? req.body.title : "";
  if (validator.isEmpty(req.body.title)) {
    errors.title = "required title";
  }

  req.body.description = !isEmpty(req.body.description)
    ? req.body.description
    : "";
  if (validator.isEmpty(req.body.description)) {
    errors.description = "required description";
  }

  req.body.sharedLink = !isEmpty(req.body.sharedLink)
    ? req.body.sharedLink
    : "";
  if (validator.isEmpty(req.body.sharedLink)) {
    errors.sharedLink = "required sharedLink";
  }

  req.file = !isEmpty(req.file) ? req.file : "";
  if (!req.file.filename) {
    errors.image = "Required image";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default imageValidation;

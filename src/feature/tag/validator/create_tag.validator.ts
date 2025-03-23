import * as yup from "yup";

export const CreateTagValidatorScheme = yup.object().shape({
  name: yup.string().required("Tag name is required"),
});

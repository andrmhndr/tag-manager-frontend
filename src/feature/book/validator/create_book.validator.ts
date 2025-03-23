import * as yup from "yup";

export const CreateBookValidatorScheme = yup.object().shape({
  title: yup.string().required("Book title is required"),
  description: yup.string().optional(),
  tags: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() })),
});

import React from "react";
import { useForm } from "react-hook-form";
import { CreateTagValidatorScheme } from "../validator/create_tag.validator";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  initial?: any;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export const TagForm: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateTagValidatorScheme),
    defaultValues: { ...props.initial },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      {props.children}
      <br />
      <section className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Tag name"
          className="w-full px-3 py-2 border"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message as string}</p>
        )}
      </section>
    </form>
  );
};

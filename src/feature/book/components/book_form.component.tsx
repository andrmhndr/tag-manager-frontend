"use client";

import { getTagSuggestionsApi } from "@/feature/tag/api/get_tag_suggestions.api";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { CreateBookValidatorScheme } from "../validator/create_book.validator";
import { debounce } from "lodash";

interface Props {
  initial?: any;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export const BookForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateBookValidatorScheme),
    defaultValues: {
      ...props.initial,
      tags: props.initial?.tags.map((value: any) => ({
        label: value.name,
        value: value._id,
      })),
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      {props.children}
      <br />
      <section className="flex flex-col gap-3">
        <input
          {...register("title")}
          type="text"
          placeholder="Book title"
          className="w-full px-3 py-2 border"
        />
        {errors.title && (
          <p className="text-red-500">{errors?.title?.message as string}</p>
        )}

        <textarea
          {...register("description")}
          placeholder="Book description"
          className="w-full px-3 py-2 border"
          maxLength={1000}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              cacheOptions
              defaultOptions
              loadOptions={debounce(async (input, callback) => {
                const result = await getTagSuggestionsApi({ search: input });
                return result.data.map((value: any) => {
                  return {
                    label: value.name,
                    value: value._id,
                  };
                });
              }, 500)}
              isMulti
              placeholder="Search and select tags"
              className="w-full"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#f8f9fa",
                  borderColor: "#ced4da",
                  borderRadius: "8px",
                  padding: "5px",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#007bff" : "#fff",
                  color: state.isFocused ? "#fff" : "#000",
                  padding: "10px",
                  cursor: "pointer",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }),
                multiValue: (provided, { data }) => ({
                  ...provided,
                }),
              }}
            />
          )}
        />
      </section>
    </form>
  );
};

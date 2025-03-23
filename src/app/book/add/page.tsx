"use client";

import { AddTitle } from "@/components/title.components";
import { createBookApi } from "@/feature/book/api/create_book.api";
import { BookForm } from "@/feature/book/components/book_form.component";
import { useRouter } from "next/navigation";
import React from "react";

const AddBookPage = () => {
  const navigate = useRouter();

  return (
    <BookForm
      onSubmit={async function (data: any): Promise<void> {
        const param = {
          ...data,
          tags: data?.tags?.map((value: any) => value.value),
        };

        const result = await createBookApi(param);
        if (result.success) {
          navigate.push(`/book/${result.data._id}`);
        }
      }}
    >
      <AddTitle title={"Add Book"}>
        <button
          type="submit"
          className="bg-white text-black hover:opacity-80 px-3 py-2"
        >
          Save
        </button>
      </AddTitle>
    </BookForm>
  );
};

export default AddBookPage;

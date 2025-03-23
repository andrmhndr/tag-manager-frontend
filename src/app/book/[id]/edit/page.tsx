"use client";

import { AddTitle } from "@/components/title.components";
import { getBookApi } from "@/feature/book/api/get_book.api";
import { updateBookApi } from "@/feature/book/api/update_book.api";
import { BookForm } from "@/feature/book/components/book_form.component";

import { useParams, useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const BookEditPage = () => {
  const { id } = useParams();
  const navigate = useRouter();

  const [initial, setInitial] = useState<any>(null);

  const initialFetch = async () => {
    const result = await getBookApi({ id: id as string });
    setInitial(result);
  };

  useLayoutEffect(() => {
    initialFetch();
  }, []);

  if (!initial)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  if (!initial.success)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p>Book not found</p>
      </div>
    );

  return (
    <BookForm
      initial={initial.data}
      onSubmit={async function (data: any): Promise<void> {
        console.log(JSON.stringify(data));

        const result = await updateBookApi({
          ...data,
          tags: data.tags.map((value: any) => value.value),
        });
        if (result.success) {
          navigate.push(`/book/${result.data._id}`);
          return;
        }
        alert("error: " + result.message);
      }}
    >
      <AddTitle title={"Edit Book"}>
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

export default BookEditPage;

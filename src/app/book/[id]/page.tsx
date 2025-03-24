"use server";

import { DetailTitle } from "@/components/title.components";
import { getBookApi } from "@/feature/book/api/get_book.api";
import { DeleteBookButton } from "@/feature/book/components/delete_book_button.components";
import React from "react";

const DetailBookPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    if (!id) throw new Error("Invalid ID");

    const book = await getBookApi({ id: id });

    if (!book.success)
      return (
        <div className="flex flex-col gap-3 min-h-screen justify-center items-center">
          <p>Book not found</p>
          <p>{JSON.stringify(book)}</p>
        </div>
      );

    const data = book.data;

    return (
      <div className="flex flex-col gap-3">
        <DetailTitle title={data.title} editPath={`/book/${id}/edit`}>
          {({ style }) => {
            return <DeleteBookButton className={style.delete} id={id} />;
          }}
        </DetailTitle>
        <section className="flex flex-col gap-2">
          <p className="py-1 px-2 bg-white text-black w-fit">{data._id}</p>
          <p>{data.description}</p>
          <div className="flex flex-wrap gap-3">
            {[...data.tags].map((value) => {
              return (
                <div
                  key={value._id}
                  style={{ backgroundColor: value.hex }}
                  className="rounded-xl py-2 px-3"
                >
                  {value.name}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
};

export default DetailBookPage;

"use server";

import { DetailTitle } from "@/components/title.components";
import { DeleteBookButton } from "@/feature/book/components/delete_book_button.components";
import { getTagApi } from "@/feature/tag/api/get_tag.api";
import { DeleteTagButton } from "@/feature/tag/components/delete_tag_button.component";
import React from "react";

const DetailTagPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    if (!id) throw new Error("Invalid ID");

    const tag = await getTagApi({ id: id });
    if (!tag.success)
      return (
        <div className="flex flex-col gap-3 min-h-screen justify-center items-center">
          <p>Tag not found</p>
          <p>{JSON.stringify(tag)}</p>
        </div>
      );

    const data = tag.data;

    return (
      <div className="flex flex-col gap-3">
        <DetailTitle title={data.name} editPath={`/tag/${id}/edit`}>
          {({ style }) => {
            return <DeleteTagButton className={style.delete} id={id} />;
          }}
        </DetailTitle>
        <section className="flex flex-col gap-2">
          <p className="py-1 px-2 bg-white text-black w-fit">{data._id}</p>
          <p>{data.hex}</p>
          <div
            className="flex flex-wrap gap-3 aspect-square w-full"
            style={{ backgroundColor: data.hex }}
          />
        </section>
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
};

export default DetailTagPage;

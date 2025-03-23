"use server";

import { Title } from "@/components/title.components";
import { getTagApi } from "@/feature/tag/api/get_tag.api";
import Link from "next/link";
import React from "react";

const TagPage = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const tags = await getTagApi();
  return (
    <main className="flex flex-col gap-8 py-3">
      <Title title="Tag" addPath={"/tag/add"} />
      <section className="flex flex-col gap-3">
        {[...tags.data].map((value) => {
          return (
            <Link
              key={value._id}
              className="flex flex-row group justify-between p-1 hover:p-4 transition-all"
              style={{ backgroundColor: value.hex }}
              href={`/tag/${value._id}`}
            >
              <p className="group-hover:bg-black group-hover:p-2 rounded-xl">
                {value.name}
              </p>
              <p className="group-hover:bg-black group-hover:p-2 rounded-xl">
                {value.hex}
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default TagPage;

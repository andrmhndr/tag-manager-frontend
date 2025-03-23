import { Title } from "@/components/title.components";
import { getBookApi } from "@/feature/book/api/get_book.api";
import Link from "next/link";
import React from "react";

const BookPage = async () => {
  const books = await getBookApi();
  return (
    <main className="flex flex-col gap-8 py-3">
      <Title title="Books" addPath={"/book/add"} />
      <section className="flex flex-col gap-3">
        {[...books.data].map((value) => {
          return (
            <Link
              key={value._id}
              className="group flex flex-col justify-between p-1 hover:p-4 transition-all hover:bg-white hover:text-black gap-2"
              style={{ backgroundColor: value.hex }}
              href={`/book/${value._id}`}
            >
              <div className="flex flex-row">
                <p className="w-full">{value.title}</p>
                <p className="w-full line-clamp-2">{value.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {value.tags.map((tag: any) => (
                  <p
                    key={tag._id}
                    className="hidden group-hover:flex w-fit px-3 py-2 rounded-xl"
                    style={{ backgroundColor: tag.hex }}
                  >
                    {tag.hex}
                  </p>
                ))}
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default BookPage;

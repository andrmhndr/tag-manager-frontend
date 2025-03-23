"use client";

import React from "react";
import { deleteBookApi } from "../api/delete_book.api";
import { useRouter } from "next/navigation";

interface Props {
  className: string;
  id: string;
}

export const DeleteBookButton: React.FC<Props> = (props) => {
  const navigate = useRouter();

  return (
    <div
      className={`${props.className}`}
      onClick={async () => {
        const result = await deleteBookApi(props.id);
        console.log(`testing delete ${JSON.stringify(result)}`);
        if (result.success) {
          navigate.push("/book");
        }
      }}
    >
      Delete
    </div>
  );
};

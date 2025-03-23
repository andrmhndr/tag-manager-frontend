"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { deleteTagApi } from "../api/delete_tag.api";

interface Props {
  className: string;
  id: string;
}

export const DeleteTagButton: React.FC<Props> = (props) => {
  const navigate = useRouter();

  return (
    <div
      className={`${props.className}`}
      onClick={async () => {
        const result = await deleteTagApi(props.id);
        console.log(`testing delete ${JSON.stringify(result)}`);
        if (result.success) {
          navigate.push("/tag");
        }
      }}
    >
      Delete
    </div>
  );
};

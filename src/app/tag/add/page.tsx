"use client";

import { AddTitle } from "@/components/title.components";
import React from "react";
import { createTagApi } from "@/feature/tag/api/create_tag.api";
import { useRouter } from "next/navigation";
import { TagForm } from "@/feature/tag/components/tag_form.component";

const AddTagPage = () => {
  const navigate = useRouter();

  return (
    <TagForm
      onSubmit={async function (data: any): Promise<void> {
        const result = await createTagApi(data);
        if (result.success) {
          navigate.push(`/tag/${result.data._id}`);
        }
      }}
    >
      <AddTitle title={"Add Tag"}>
        <button
          type="submit"
          className="bg-white text-black hover:opacity-80 px-3 py-2"
        >
          Save
        </button>
      </AddTitle>
    </TagForm>
  );
};

export default AddTagPage;

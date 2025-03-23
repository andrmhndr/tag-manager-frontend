"use client";

import { AddTitle } from "@/components/title.components";
import { getTagApi } from "@/feature/tag/api/get_tag.api";
import { updateTagApi } from "@/feature/tag/api/update_tag.api";
import { TagForm } from "@/feature/tag/components/tag_form.component";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const EditTagPage = () => {
  const { id } = useParams();
  const navigate = useRouter();

  const [initial, setInitial] = useState<any>(null);

  const initialFetch = async () => {
    const result = await getTagApi({ id: id as string });
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
        <p>Tag not found</p>
      </div>
    );

  return (
    <TagForm
      initial={initial.data}
      onSubmit={async function (data: any): Promise<void> {
        const result = await updateTagApi({ ...data, id });
        if (result.success) {
          navigate.push(`/tag/${result.data._id}`);
          return;
        }
        alert("error: " + result.message);
      }}
    >
      <AddTitle title={"Edit Tag"}>
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

export default EditTagPage;

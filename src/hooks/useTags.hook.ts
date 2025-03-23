import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import debounce from "lodash.debounce";
import { getTagSuggestionsApi } from "@/feature/tag/api/get_tag_suggestions.api";

export const useTags = () => {
  const [tagOptions, setTagOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async (search = "") => {
    setIsLoading(true);
    try {
      const result = await getTagSuggestionsApi({ search });
      const data = result.data;
      setTagOptions(
        data.map((tag: any) => ({ value: tag._id, label: tag.name }))
      );
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
    setIsLoading(false);
  };

  const debouncedFetchTags = useCallback(debounce(fetchTags, 500), []);

  return { tagOptions, isLoading, fetchTags: debouncedFetchTags };
};

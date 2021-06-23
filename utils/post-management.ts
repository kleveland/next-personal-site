import pageList from "../_posts/data.json";
import { formatDate } from "utils/utils";
import axios from "axios";
import { ExtendedRecordMap } from "notion-types";

const PAGE_ENDPOINT: string = "https://www.notion.so/api/v3/loadPageChunk";

const COLLECTION_ID: string = "19d7f583-b6a6-460d-9eb4-19c02a221c91";

export const getPost = async (pageId: string) => {
  const result: any = await axios.post(PAGE_ENDPOINT, {
    chunkNumber: 0,
    cursor: { stack: [] },
    limit: 100,
    page: {
      id: pageId,
    },
    verticalColumns: false,
  });

  return result.data;
};

export const getPostList = (pageList: any) => {
  const data = pageList.recordMap;
  const schemaMap = data.collection[COLLECTION_ID].value.schema;
  const entries = Object.entries(data.block)
    .filter((entry: any) => entry[1].value.properties)
    .reverse()
    .map((entry: any) => {
      const newEntry: any = {
        id: entry[0],
        title: entry[1].value.properties.title[0][0],
        imageLink: entry[1].value.format
          ? `https://www.notion.so/image/${encodeURIComponent(
              entry[1].value.format?.page_icon
            )}?table=block&id=${entry[0]}&cache=v2`
          : "/post_images/empty_image.svg",
      };
      Object.keys(entry[1].value.properties).forEach((key: string) => {
        const schema = schemaMap[key];
        if (schema.type === "text")
          newEntry[schemaMap[key].name] = entry[1].value.properties[key][0][0];
        else if (schema.type === "multi_select")
          newEntry[schemaMap[key].name] =
            entry[1].value.properties[key][0][0].split(",");
        else if (schema.type === "date")
          newEntry[schemaMap[key].name] = formatDate(
            entry[1].value.properties[key][0][1][0][1].start_date
          );
      });
      return newEntry;
    });

  return entries;
};

export const getPostFromSlug = async (slug: string) => {
  const mappedList = getPostList(pageList);
  const foundPost = mappedList.find((entry: any) => entry["Slug"] === slug);
  if (!foundPost)
    return {
      props: {},
      revalidate: 10,
    };
  const results = await getPost(foundPost.id);
  return { results, foundPost };
};

export const findPageBlock = (recordMap: ExtendedRecordMap) =>
  Object.keys(recordMap.block).find(
    (key: string) => recordMap.block[key].value.type === "page"
  );

export const getImageUrlFromPageBlock = (pageBlock: any) => {
  const foundImageLink = pageBlock.value.format?.page_icon
    ? pageBlock.value.format.page_icon
    : false;
  return foundImageLink
    ? `https://www.notion.so/image/${encodeURIComponent(
        foundImageLink
      )}?table=block&id=${pageBlock.value.id}&cache=v2`
    : "/post_images/empty_image.svg";
};

export const getSlugPaths = () => {
  const results = getPostList(pageList);
  return results.map((entry: any) => ({
    params: { slug: entry["Slug"] },
  }));
};

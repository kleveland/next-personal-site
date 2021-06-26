import pageList from "../_posts/data.json";
import { formatDate } from "utils/utils";
import axios from "axios";
import { ExtendedRecordMap } from "notion-types";

const PAGE_ENDPOINT: string = "https://www.notion.so/api/v3/loadPageChunk";

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
  const collectionId = Object.keys(data.collection)[0];
  const collectionViewId = Object.keys(data.collection_view)[0];
  const schemaMap = data.collection[collectionId].value.schema;
  const collectionViewSort = data.collection_view[
    collectionViewId
  ].value.query2.sort.filter(
    (field: { property: string; direction: string }) =>
      field.property !== "title"
  )[0];
  const entries = Object.entries(data.block)
    .filter((entry: any) => entry[1].value.properties)
    .sort(
      (a: any, b: any) =>
        new Date(
          b[1].value.properties[collectionViewSort.property][0][1][0][1].start_date
        ).getTime() -
        new Date(
          a[1].value.properties[collectionViewSort.property][0][1][0][1].start_date
        ).getTime()
    )
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

import axios from "axios";

const PAGE_ENDPOINT: string =
  "https://www.notion.so/api/v3/loadCachedPageChunk";

export default async (pageId: string) => {
  const result: any = await axios.post(PAGE_ENDPOINT, {
    chunkNumber: 0,
    cursor: { stack: [] },
    limit: 100,
    page: {
      id: pageId
    },
    verticalColumns: false,
  });
  
  return result.data;
};

async function getPage(pageId: string, chunkNumber: number) {
  return (await axios.post(PAGE_ENDPOINT, {
    chunkNumber,
    cursor: { stack: [] },
    limit: 50,
    page: {
      id: pageId
    },
    verticalColumns: false,
  }));
}

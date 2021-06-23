import React, { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/blogpost.module.css";
import { getPostFromSlug, getPostList } from "utils/post-management";
import useOpenGraphImage from 'utils/use-open-graph-image';
import { NotionRenderer, Code, CollectionRow } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import { getPageTableOfContents, TableOfContentsEntry } from "notion-utils";
import { useInView } from "react-intersection-observer";
import pageList from "../../../_posts/data.json";
import MainLayout from "../../../layouts/main";

export const getStaticProps = async (context: any) => {
  const { results, foundPost } = await getPostFromSlug(context.params["slug"]);
  const foundImageBlock = Object.keys(results.recordMap.block).find(
    (key: string) => results.recordMap.block[key].value.type === "page"
  );
  const foundImageLink =
    foundImageBlock &&
    results.recordMap.block[foundImageBlock].value.format?.page_icon
      ? results.recordMap.block[foundImageBlock].value.format.page_icon
      : false;
  const imageUrl =
    foundImageLink && foundImageBlock
      ? `https://www.notion.so/image/${encodeURIComponent(
          foundImageLink
        )}?table=block&id=${
          results.recordMap.block[foundImageBlock].value.id
        }&cache=v2`
      : "/post_images/empty_image.svg";
  const recordMap = results.recordMap;
  const tableOfContents = foundImageBlock
    ? getPageTableOfContents(
        results.recordMap.block[foundImageBlock].value,
        recordMap
      )
    : "";
  return {
    props: {
      pageBlock: foundImageBlock
        ? results.recordMap.block[foundImageBlock]
        : undefined,
      recordMap,
      imageUrl,
      tableOfContents,
      ...foundPost,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {

  const results = getPostList(pageList);
  const mappedSlugs = results.map((entry: any) => ({
    params: { slug: entry["Slug"] },
  }));

  return {
    paths: mappedSlugs,
    fallback: true,
  };
}

function NotionPage({
  recordMap,
  tableOfContents,
  title,
  Slug,
  imageUrl,
  Description,
  pageBlock,
}: {
  Slug: string;
  title: string;
  tableOfContents: any;
  Description: string;
  recordMap: ExtendedRecordMap;
  imageUrl: string;
  pageBlock: any;
}) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { imageURL } = useOpenGraphImage();
  console.log('absolute URL', imageURL);

  if (!recordMap) {
    return null;
  }

  const pageHeader = (
    <div className={styles["blog-post-title-container"]}>
      <div className={styles["blog-post-title"] + " notion-h notion-h1"}>
        {title}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Kacey Cleveland - {title}</title>
        <meta name="description" content={Description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={ref}
        className={
          styles["blog-post-image-container"] +
          " " +
          (!inView ? styles["not-in-view"] : "")
        }
      >
        <Image src={imageUrl} width={140} height={140} alt="Post image" />
      </div>
      <div className={styles["blog-post-content-container"] +
          " " + (!inView ? styles["set-index"] : "")}>
        <CollectionRow block={pageBlock.value} />
        <div className={styles["blog-post-container"]}>
          <NotionRenderer
            pageHeader={pageHeader}
            className={styles["blog-post-notion-container"]}
            components={{
              code: Code,
              collectionRow: CollectionRow,
            }}
            recordMap={recordMap}
            darkMode={false}
          />
          <TableOfContents toc={tableOfContents} />
        </div>
      </div>
    </>
  );
}

interface TableOfContentsProps {
  toc: TableOfContentsEntry[];
}

function TableOfContents({ toc }: TableOfContentsProps): ReactElement {
  return (
    <aside className={"notion-aside " + styles["blog-notion-aside"]}>
      <div className={styles["blog-table-of-contents-title"]}>
        Table of Contents
      </div>
      <div className={styles["blog-table-of-contents"]}>
        {toc.map((entry) => {
          const className = "blog-table-of-contents__" + entry.type;
          if (!entry.id.replaceAll) return;
          const link = "#" + entry.id.replaceAll("-", "");
          console.log(className);
          return (
            <Link href={link}>
              <div
                className={
                  styles["blog-table-of-contents__entry"] +
                  " " +
                  styles[className]
                }
              >
                <a href={link}>{entry.text}</a>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

NotionPage.extendedHeader = true;
NotionPage.Layout = MainLayout;

export default NotionPage;

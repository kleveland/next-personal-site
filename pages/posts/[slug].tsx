import React from "react";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import styles from "styles/posts/[slug].module.css";
import {
  getPostFromSlug,
  findPageBlock,
  getImageUrlFromPageBlock,
  getSlugPaths
} from "utils/post-management";
import TableOfContents from 'components/posts/TableOfContents';
import useOpenGraphImage from "utils/use-open-graph-image";
import { getAbsoluteURL } from "utils/utils";
import { NotionRenderer, Code, CollectionRow } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import { getPageTableOfContents } from "notion-utils";
import { useInView } from "react-intersection-observer";
import MainLayout from "layouts/main";

export const getStaticProps = async (context: any) => {
  const { results, foundPost } = await getPostFromSlug(context.params["slug"]);
  const pageBlockIndex = findPageBlock(results.recordMap);
  if (!pageBlockIndex)
    throw Error("No page block found for " + context.params["slug"]);
  const pageBlock = results.recordMap.block[pageBlockIndex];

  const imageUrl = getImageUrlFromPageBlock(pageBlock);
  const recordMap = results.recordMap;
  const tableOfContents = getPageTableOfContents(pageBlock.value, recordMap);
  return {
    props: {
      pageBlock,
      recordMap,
      imageUrl,
      tableOfContents,
      ...foundPost,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const paths = getSlugPaths();
  return {
    paths,
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
  const router = useRouter();
  const { imageURL } = useOpenGraphImage();
  const rootURL = getAbsoluteURL(router.asPath);
  console.log("absolute URL", imageURL, rootURL);
  console.log("router", router);

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
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={rootURL} />
        <meta property="og:image" content={imageURL} />
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
      <div
        className={
          styles["blog-post-content-container"] +
          " " +
          (!inView ? styles["set-index"] : "")
        }
      >
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

NotionPage.extendedHeader = true;
NotionPage.Layout = MainLayout;

export default NotionPage;

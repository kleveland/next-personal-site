import React from "react";
import Image from "next/image";
import styles from "styles/posts/open-graph/[slug].module.css";
import {
  getPostFromSlug,
  findPageBlock,
  getImageUrlFromPageBlock,
  getSlugPaths,
} from "utils/post-management";
import OpenGraphLayout from "layouts/open-graph";

export const getStaticProps = async (context: any) => {
  const { results, foundPost } = await getPostFromSlug(context.params["slug"]);
  const pageBlockIndex = findPageBlock(results.recordMap);
  if (!pageBlockIndex)
    throw Error("No page block found for " + context.params["slug"]);
  const pageBlock = results.recordMap.block[pageBlockIndex];

  const imageUrl = getImageUrlFromPageBlock(pageBlock);
  return {
    props: {
      pageBlock,
      imageUrl,
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
  title,
  Tags,
  imageUrl,
  Description,
}: {
  Slug: string;
  title: string;
  Description: string;
  Tags: string[];
  imageUrl: string;
  pageBlock: any;
}) {
  return (
    <div className={styles["content-container"]}>
      <div className={styles["blog-post-image-container"]}>
        <Image src={imageUrl} width={280} height={280} alt="Post image" />
      </div>
      <div className={styles["details-container"]}>
        <div className={styles["text-container"]}>
          <h1 className={styles["title-text"]}>{title}</h1>
          <div className={styles["tag-container"]}>{Tags.map(tag => <span className={styles["tag"]}>{tag}</span>)}</div>
          <div className={styles["description-text"]}>{Description}</div>
        </div>
      </div>
    </div>
  );
}

NotionPage.Layout = OpenGraphLayout;

export default NotionPage;

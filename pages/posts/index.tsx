import React from "react";
import { useRouter, NextRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import getPostList from "../api/post-list";
import styles from "../../styles/blogsummary.module.css";
import pageList from "../../_posts/test_blog_list.json";
import MainLayout from "../../layouts/main";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export interface PostEntry {
  id: string;
  title: string;
  "Creation Date": string;
  Description: string;
  Slug: string;
  Tags: string[];
  imageLink: string;
}

interface PostEntryCardProps extends PostEntry {
  router: NextRouter;
}

interface PostList {
  mappedList: PostEntry[];
}

export const getStaticProps = async () => {
  const mappedList = getPostList(pageList);
  console.log(mappedList);
  return {
    props: {
      mappedList,
    },
    revalidate: 10,
  };
};

function NotionPage({ mappedList }: PostList) {
  const router = useRouter();
  console.log(mappedList);
  return (
    <>
      <Head>
        <title>Kacey Cleveland - Posts</title>
        <meta name="description" content="List of recent posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["blog-posts-title-container"]+ ' notion-h notion-h1'}>Recent Posts</div>
      {mappedList.map((entry: PostEntry) => (
        <PostEntryCard router={router} {...entry} />
      ))}
    </>
  );
}

function PostEntryCard(props: PostEntryCardProps) {
  return (
    <div className={styles["blog-entry-container"]}>
      <div className={styles["blog-image-container"]}>
        {props.imageLink && (
          <Image src={props.imageLink} width={64} height={64} />
        )}
      </div>
      <div className={styles["blog-entry-text-container"]}>
        <div className={styles["blog-entry-title-container"]+ ' notion-h'}>
          <Link href={`/posts/${props["Slug"]}`}>
            <div className={styles["blog-entry-title"]}>{props["title"]}</div>
          </Link>
          <div className={styles["blog-entry-date"]}>
            {props["Creation Date"]}
          </div>
        </div>
        <div className={styles["blog-entry-description"]}>
          {props["Description"]}
        </div>
      </div>
    </div>
  );
}

NotionPage.Layout = MainLayout;

export default NotionPage;

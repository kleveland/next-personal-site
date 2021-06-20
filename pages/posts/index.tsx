import React from "react";
import { useRouter, NextRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import getPostList from "../api/post-list";
import postSummaryStyles from "../../styles/blogsummary.module.css";
import pageList from "../../_posts/data.json";
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
  return (
    <>
      <Head>
        <title>Kacey Cleveland - Posts</title>
        <meta name="description" content="List of recent posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={postSummaryStyles["blog-posts-title-container"]+ ' notion-h notion-h1'}>Recent Posts</div>
      {mappedList.map((entry: PostEntry, index: number) => (
        <PostEntryCard key={'post-entry-'+index} router={router} {...entry} />
      ))}
    </>
  );
}

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

export function PostEntryCard(props: PostEntryCardProps) {
  return (
    <Link href={`/posts/${props["Slug"]}`}>
      <a className={postSummaryStyles["blog-entry-container"]}>
        <div className={postSummaryStyles["blog-image-parent-container"]}>
          <div className={postSummaryStyles["blog-image-container"]}>
            {props.imageLink && (
              <Image
                alt="Post image"
                src={props.imageLink}
                width={280}
                height={280}
              />
            )}
          </div>
        </div>
        <div className={postSummaryStyles["blog-entry-text-container"]}>
          <div
            className={
              postSummaryStyles["blog-entry-title-container"] + " notion-h"
            }
          >
            <Link href={`/posts/${props["Slug"]}`}>
              <a className={postSummaryStyles["blog-entry-title"]}>
                {props["title"]}
              </a>
            </Link>
            <div className={postSummaryStyles["blog-entry-date"]}>
              {props["Creation Date"]}
            </div>
          </div>
          <div className={postSummaryStyles["blog-entry-description"]}>
            {props["Description"]}
          </div>
        </div>
      </a>
    </Link>
  );
}

NotionPage.Layout = MainLayout;

export default NotionPage;

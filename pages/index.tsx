import Head from "next/head";
import Image from "next/image";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import postSummaryStyles from "../styles/blogsummary.module.css";
import { PostEntryCard, PostEntry } from '../pages/posts/index';
import styles from "../styles/home.module.css";
import MainLayout from "../layouts/main";
import getPost from "./api/post";
import getPostList from "./api/post-list";
import pageList from "../_posts/data.json";
import { ReactElement } from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

interface HomeProps {
  summaryRecordMap: ExtendedRecordMap;
  mappedPostList: any;
}

export const getStaticProps = async (context: any) => {
  const summaryResults = await getPost("352ff312-52da-470d-b7b5-dceb769bca23");
  const mappedPostList = getPostList(pageList);

  const summaryRecordMap = summaryResults.recordMap;
  return {
    props: {
      summaryRecordMap,
      mappedPostList,
    },
    revalidate: 10,
  };
};

function Home({ summaryRecordMap, mappedPostList }: HomeProps): ReactElement {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Kacey Cleveland - Home</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles["main-header-container"]}>
          <Image
            src="/avatar.svg"
            width="198"
            height="210"
            alt="Kacey Cleveland Avatar"
          />
          <NotionRenderer
            className={styles["main-body-container"]}
            recordMap={summaryRecordMap}
          />
        </div>
        <div
          className={
            postSummaryStyles["blog-posts-title-container"] +
            " notion-h notion-h1"
          }
        >
          Recent Posts
        </div>
        <div className={postSummaryStyles["blog-posts-main-container"]}>
          {mappedPostList.map((entry: PostEntry, index: number) => (
            <PostEntryCard
              key={"post-entry-" + index}
              router={router}
              {...entry}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

Home.extendedHeader = true;
Home.Layout = MainLayout;

export default Home;

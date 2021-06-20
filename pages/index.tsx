import Head from "next/head";
import Image from "next/image";
import { useRouter, NextRouter } from "next/router";
import Link from 'next/link';
import postSummaryStyles from "../styles/blogsummary.module.css";
import styles from "../styles/home.module.css";
import MainLayout from "../layouts/main";
import getPost from "./api/post";
import getPostList from "./api/post-list";
import pageList from "../_posts/data.json";
import { ReactElement } from "react";
import { NotionRenderer } from "react-notion-x";

interface HomeProps {
  recordMap: any;
  summaryRecordMap: any;
  mappedPostList: any;
}

export const getStaticProps = async (context: any) => {
  const results = await getPost("0561ad09-5dda-4692-8fa0-5a0baff7b14a");
  const summaryResults = await getPost("352ff312-52da-470d-b7b5-dceb769bca23");
  const mappedPostList = getPostList(pageList);

  const summaryRecordMap = summaryResults.recordMap;
  const recordMap = results.recordMap;
  return {
    props: {
      recordMap,
      summaryRecordMap,
      mappedPostList,
    },
    revalidate: 10,
  };
};

function Home({
  recordMap,
  summaryRecordMap,
  mappedPostList,
}: HomeProps): ReactElement {
  const router = useRouter();
  console.log(summaryRecordMap);
  return (
    <div className={styles.container}>
      <Head>
        <title>Kacey Cleveland - Home</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles["main-header-container"]}>
          <Image src="/avatar.svg" width="198" height="210" alt="Kacey Cleveland Avatar" />
          <NotionRenderer
            className={styles["main-body-container"]}
            recordMap={summaryRecordMap}
          />
        </div>
        {/* <NotionRenderer
          className={styles["summary-body-container"]}
          recordMap={recordMap}
          darkMode={false}
        /> */}
        <div
          className={
            postSummaryStyles["blog-posts-title-container"] + " notion-h notion-h1"
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
        ))}</div>
      </main>
    </div>
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

interface PostList {
  mappedList: PostEntry[];
}

function PostEntryCard(props: PostEntryCardProps) {
  return (
    
    <Link href={`/posts/${props["Slug"]}`}>
    <a className={postSummaryStyles["blog-entry-container"]}>
      <div className={postSummaryStyles["blog-image-parent-container"]}>
      <div className={postSummaryStyles["blog-image-container"]}>
        {props.imageLink && (
          <Image alt="Post image" src={props.imageLink} width={280} height={280} />
        )}
      </div>
      </div>
      <div className={postSummaryStyles["blog-entry-text-container"]}>
        <div className={postSummaryStyles["blog-entry-title-container"]+ ' notion-h'}>
        <Link href={`/posts/${props["Slug"]}`}>
            <a className={postSummaryStyles["blog-entry-title"]}>{props["title"]}</a>
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


Home.Layout = MainLayout;

export default Home;

import { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { PostEntryCard, PostEntry } from 'components/posts/PostEntryCard';
import MainLayout from "layouts/main";
import { getPost, getPostList } from 'utils/post-management';
import pageList from "../_posts/data.json";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

import styles from "styles/index.module.css";
import postSummaryStyles from "styles/posts/index.module.css";

interface HomeProps {
  summaryRecordMap: ExtendedRecordMap;
  mappedPostList: any;
}

export const getStaticProps = async () => {
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

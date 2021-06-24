import React from "react";
import Head from "next/head";
import { getPostList } from 'utils/post-management';
import { PostEntry, PostEntryCard } from 'components/posts/PostEntryCard';
import pageList from "../../_posts/data.json";
import MainLayout from "layouts/main";
import cn from 'classnames';

import postSummaryStyles from "styles/posts/index.module.scss";

interface PostList {
  mappedList: PostEntry[];
}

export const getStaticProps = async () => {
  const mappedList = getPostList(pageList);
  return {
    props: {
      mappedList,
    },
    revalidate: 10,
  };
};

function NotionPage({ mappedList }: PostList) {
  return (
    <>
      <Head>
        <title>Kacey Cleveland - Posts</title>
        <meta name="description" content="List of recent posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cn(postSummaryStyles["blog-posts-title-container"], 'notion-h notion-h1')}>Recent Posts</div>
      {mappedList.map((entry: PostEntry, index: number) => (
        <PostEntryCard key={'post-entry-'+index} {...entry} />
      ))}
    </>
  );
}

NotionPage.Layout = MainLayout;

export default NotionPage;

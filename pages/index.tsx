import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import MainLayout from '../layouts/main';
import getPost from "./api/post";
import { ReactElement } from 'react';
import { NotionRenderer } from "react-notion-x";


interface HomeProps {
  recordMap: any;
  summaryRecordMap: any;
}

export const getStaticProps = async (context: any) => {
  const results = await getPost("0561ad09-5dda-4692-8fa0-5a0baff7b14a");
  const summaryResults = await getPost("352ff312-52da-470d-b7b5-dceb769bca23");

  const summaryRecordMap = summaryResults.recordMap;
  const recordMap = results.recordMap;
  return {
    props: {
      recordMap,
      summaryRecordMap
    },
    revalidate: 10,
  };
};

function Home({ recordMap, summaryRecordMap } :HomeProps): ReactElement {
  console.log(summaryRecordMap);
  return (
    <div className={styles.container}>
      <Head>
        <title>Kacey Cleveland - Home</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles['main-header-container']}>
        <Image src="/avatar.svg" width="198" height="210" />
        <NotionRenderer className={styles['main-body-container']} recordMap={summaryRecordMap} /></div>
        <NotionRenderer className={styles['summary-body-container']}
    recordMap={recordMap}
    darkMode={false}
  />
        </main>
    </div>
  )
}

Home.Layout = MainLayout

export default Home
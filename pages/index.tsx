import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainLayout from '../layouts/main';
import { useRouter } from 'next/router'

function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Kacey Cleveland - Home</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        </main>
    </div>
  )
}

Home.Layout = MainLayout

export default Home
import Head from 'next/head';
import Layout from '../shared/components/layout';
import { Header } from '../landing-page/components';
export default function Home() {
  return (
    <Layout>
      <Head>
				<title>Roadmap</title>
				<meta name="description" content="Roadmap App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <Header />
    </Layout>
  )
}

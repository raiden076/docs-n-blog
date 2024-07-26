import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <em>{siteConfig.title}</em>
        </Heading>
        <p className="hero__subtitle"><em>{siteConfig.tagline}</em></p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/note/20240725141633-why---when---how">
            still, why all this? 🗿
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={"Hello"}
      description="All my notes and a few blog">
      <HomepageHeader />
      <main>
        <Head>
          <meta property='og:image' content='/img/undraw_Personal_notebook_re_d7dc.png' />
        </Head>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

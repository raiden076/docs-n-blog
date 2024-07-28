import clsx from 'clsx';
import Link from '@docusaurus/Link';
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
        <Heading as="h1" className={clsx("hero__title", styles.blackText)}>
          All my <em className={styles.crimsonText}>notes</em> and <em className={styles.crimsonText}>a few blog</em>

          {/* <em>{siteConfig.title}</em> */}
        </Heading>
        <p className={clsx("hero__subtitle", styles.blackText)}>Because? <em>{"#open_source_everything"}</em></p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/note/20240725141633-why---when---how">
            still, why <span className={styles.wavyText}>all</span> this? 🗿
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
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

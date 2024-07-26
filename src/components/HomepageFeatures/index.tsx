import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';


type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'zettelkasten notes',
    Svg: require('@site/static/img/undraw_happy_music_g6wc.svg').default,
    description: (
      <>
        to tame my <em>extremely disorganized brain</em>. <Link to={'/note/20240725141633-why---when---how'}>
          They might be interesting, have a look
        </Link>
      </>
    ),
  },
  {
    title: 'A few and far blogs',
    Svg: require('@site/static/img/undraw_barista_qd50.svg').default,
    description: (
      <>
        I don't like writing long boring articles, that much. But, <Link to={'/blog'}>
          if there is an interesting enough topic, have a look, here
        </Link>
      </>
    ),
  },
  {
    title: 'check out the main portfolio',
    Svg: require('@site/static/img/undraw_applications_mqwk.svg').default,
    description: (
      <>
        <Link to={'https://arkaprav0.in'}>Here</Link>, is my main portfolio. <Link to={'https://arkaprav0.in'}>
          Check it out, you'll also find projects I have worked on.
        </Link>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

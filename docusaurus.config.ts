import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'All my notes and a few blog',
  tagline: 'Because? #open_source_everything',
  favicon: 'img/favicon.ico',
  markdown: {
    format: 'md',
  },

  // Set the production url of your site here
  url: 'https://notes.arkaprav0.in',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    [
      './space-sync/dist',
      {
        srcDir: './space',
      },
    ],
    '@docusaurus/plugin-ideal-image'
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'note',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/undraw_Personal_notebook_re_d7dc.png',
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    navbar: {
      title: 'notes & blog',
      logo: {
        alt: 'My Personal Castle',
        src: 'img/undraw_small_town_re_7mcn.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notesSidebar',
          position: 'left',
          label: 'Notes',
          // to: '/docs/20240725141633-why---when---how',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://arkaprav0.in/',
          label: '🎤 arkaprav0.in',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Here',
          items: [
            {
              label: 'Notes',
              to: '/note/20240725141633-why---when---how',
            },
            {
              label: 'Blog',
              to: '/blog',
            }
          ],
        },
        {
          title: 'Socials',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            {
              label: 'Github',
              href: 'https://github.com/raiden076',
            },
            {
              label: 'X',
              href: 'https://x.com/arkaprav0',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/arkaprav0',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Check out the source code',
              href: 'https://github.com/raiden076/docs-n-blog',
            },
            {
              label: 'My main portfolio',
              href: 'https://arkaprav0.in',
            }
          ],
        },
      ],
      copyright: `Made with ❤️ in India © ${new Date().getFullYear()} Arkapravo Das`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

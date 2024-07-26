---
tags:
  - dev/web/portfolio/docs-n-blog
  - docusaurus/sidebar
title: docs & blog - sidebar style change
slug: 20240726154455-docs-&-blog---sidebar-style-change
id: 20240726154455-docs-&-blog---sidebar-style-change
---
### Why

Because otherwise categories and the notes in same thickness look, ugly, at least for my usecase

### How

Turned out pretty easy, 
For many most used and important classes, they are doced, add specific style to those classes was enough

```js
export const ThemeClassNames = {
  page: {
    blogListPage: 'blog-list-page',
    blogPostPage: 'blog-post-page',
    blogTagsListPage: 'blog-tags-list-page',
    blogTagPostListPage: 'blog-tags-post-list-page',
    docsDocPage: 'docs-doc-page',
    docsTagsListPage: 'docs-tags-list-page',
    docsTagDocListPage: 'docs-tags-doc-list-page',
    mdxPage: 'mdx-page',
  },
  wrapper: {
    main: 'main-wrapper',
    blogPages: 'blog-wrapper',
    docsPages: 'docs-wrapper',
    mdxPages: 'mdx-wrapper',
  },
  common: {
    editThisPage: 'theme-edit-this-page',
    lastUpdated: 'theme-last-updated',
    backToTopButton: 'theme-back-to-top-button',
    codeBlock: 'theme-code-block',
    admonition: 'theme-admonition',
    unlistedBanner: 'theme-unlisted-banner',
    admonitionType: (type: string) => `theme-admonition-${type}`,
  },
  layout: {
  },
  docs: {
    docVersionBanner: 'theme-doc-version-banner',
    docVersionBadge: 'theme-doc-version-badge',
    docBreadcrumbs: 'theme-doc-breadcrumbs',
    docMarkdown: 'theme-doc-markdown',
    docTocMobile: 'theme-doc-toc-mobile',
    docTocDesktop: 'theme-doc-toc-desktop',
    docFooter: 'theme-doc-footer',
    docFooterTagsRow: 'theme-doc-footer-tags-row',
    docFooterEditMetaRow: 'theme-doc-footer-edit-meta-row',
    docSidebarContainer: 'theme-doc-sidebar-container',
    docSidebarMenu: 'theme-doc-sidebar-menu',
    docSidebarItemCategory: 'theme-doc-sidebar-item-category',
    docSidebarItemLink: 'theme-doc-sidebar-item-link',
    docSidebarItemCategoryLevel: (level: number) =>
      `theme-doc-sidebar-item-category-level-${level}` as const,
    docSidebarItemLinkLevel: (level: number) =>
      `theme-doc-sidebar-item-link-level-${level}` as const,
  },
  blog: {
    blogFooterTagsRow: 'theme-blog-footer-tags-row',
    blogFooterEditMetaRow: 'theme-blog-footer-edit-meta-row',
  },
  pages: {
    pageFooterEditMetaRow: 'theme-pages-footer-edit-meta-row',
  },
} as const;
```


Reference:
1. https://docusaurus.io/docs/styling-layout

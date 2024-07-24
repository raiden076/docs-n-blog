---
tags:
  - docusaurus/sidebar
  - obsidian/tags
title: docs sidebar - what to do
slug: 20240722160139-docs-sidebar---what-to-do
---

So, after processing, we'll have this  key: id, value: {name: doc name, tags: (all, including nested)}

>You can, however, use the `sidebar_label` Markdown front matter within that doc, which has higher precedence over the `label` key in the sidebar item.

### So why not simply create the sidebars from here without changing anything else:

>[Generated index page​](https://docusaurus.io/docs/sidebar/items#generated-index-page "Direct link to Generated index page")
You can auto-generate an index page that displays
We don't need the abocve these > distractions

Shorthand for docs inside category: (Guides, Docs are categ., green small names are docs)
```js
export default {
  docs: {
    Guides: [
      'creating-pages',
      {
        Docs: ['introduction', 'sidebar', 'markdown-features', 'versioning'],
      },
    ],
  },
};
```


Reference:
1. https://docusaurus.io/docs/sidebar/items
2. 

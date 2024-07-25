---
tags:
  - docusaurus/plugin
  - docusaurus/sidebar
  - obsidian/tags
title: Integration of docusaurus and obsidian vault
slug: 20240722144345-integration-of-docusaurus-and-obsidian-vault
id: 20240722144345-integration-of-docusaurus-and-obsidian-vault
---
Done until now:
1. Creation of vault
2. Initializing and pushing git
3. Creating initial structure, tags, notes

Left
1. Nested tags to sidebar mapping
2. Creating git submodule inside docu.
3. Read more about docu. plugin and sidebar

So todos, now, 
- [x] Read more about docu sidebar ✅ 2024-07-22
- [x] Read more about docu plugins ✅ 2024-07-23
- [x] Read more from [gpt on docusaurus sidebar-plugin](/note/20240722005751-gpt-on-docusaurus-sidebar-plugin) ✅ 2024-07-23
- [x] Create submodule, import ✅ 2024-07-23
- [x] Start planning then executing mapping ✅ 2024-07-23

Notes on sidebar:

>You can, however, use the `sidebar_label` Markdown front matter within that doc, which has higher precedence over the `label` key in the sidebar item.
```js
export default {
  mySidebar: [
    // Normal syntax:
    {
      type: 'doc',
      id: 'doc1', // document ID
      label: 'Getting started', // sidebar label
    },
    // Shorthand syntax:
    'doc2', // document ID
  ],
};
```
In the build script {the npm script} will
1. copy all files from src/2024... To docs/2024...
2. Generate a sidebar.json which can be imported in sidebar.ts
	1. Create a var at top level (for **what**?)
	2. Go through each file `
		1. Read 1st 5 line max
		2. Write necessary metadata (like `sidebar_label` , ) ***{ [Metadata API](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) }***
		3. Create a key value pair for each document key: id, value: {name: doc name, tags: (all, including nested)}
	3. From the nested tags () -> sidebar folder structure (inside links can be repeated, but files are not) ***{ [docs sidebar - what to do](/note/20240722160139-docs-sidebar---what-to-do) }***
	4. Spew out sidebar.json
3. I don't need any plugins, not yet anyway



Reference:
1. https://docusaurus.community/
2. https://docusaurus.io/docs/
3. https://docusaurus.io/docs/sidebar/items

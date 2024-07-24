---
tags:
  - docusaurus/plugin
  - docusaurus/sidebar
  - dev/web/portfolio/docs-n-blog
title: docusaurus plugin - what it needs to do
slug: 20240722213731-docusaurus-plugin---what-it-needs-to-do
---

### In short: 
1. Import docs and blogs from source directory
2. Read the files
3. Parse the front matters of said files
4. Add appropriate `title` frontmatter
5. Alter obsidian backlinks to appropriate docusaurus links
6. Write the files
7. Create the tags dictionary ( key: id, value: {name: doc name, tags: (all, including nested)} )
8. Create and place the sidebar file ***[TagMap and enhanced sidebar](/docs/20240724133308-tagmap-and-enhanced-sidebar)***
9. Load the files in destination directory


### Notes :
```js
const glob = require('glob');
const matter = require('gray-matter');

function getDocs(srcDir) {
  // const files = glob.sync("../../docs/**/*.md"); // Adjust path as necessary
  const files = glob.sync(path.join(srcDir, "/**/*.md"))
  return files.map(file => {
    const content = fs.readFileSync(file, 'utf8');
    const metadata = matter(content);
    return {
      ...metadata.data,
      path: file, 
    };
  });
}
```
- [x] 🔺 Change glob to the official one ✅ 2024-07-22 (glob turned out better)


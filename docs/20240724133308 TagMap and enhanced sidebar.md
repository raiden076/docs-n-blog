---
tags:
  - dev/web/portfolio
  - docusaurus/sidebar
  - docusaurus/plugin
title: TagMap and enhanced sidebar
slug: 20240724133308-tagmap-and-enhanced-sidebar
---
### TagMap structure now:

```js
tagMap:  Map(6) {
  'test/1' => {
    name: 'test/1',
    files: [ 'space/src/20240721151922 Test Note.md' ]
  },
  'docusaurus/plugin' => {
    name: 'docusaurus/plugin',
    files: [
      'space/src/20240722144345 Integration of docusaurus and obsidian vault.md',
      'space/src/20240722213731 docusaurus plugin - what it needs to do.md',
      'space/src/20240722005751 gpt on docusaurus sidebar-plugin.md',
      'space/src/20240723003043 docusaurus plugin - an even better plan.md',
      'space/src/20240723122006 docusaurus plugin - an even better plan ctd.md'
    ]
  },
  'docusaurus/sidebar' => {
    name: 'docusaurus/sidebar',
    files: [
      'space/src/20240722144345 Integration of docusaurus and obsidian vault.md',
      'space/src/20240722160139 obsidian tags to docusaurus map.md',
      'space/src/20240722213731 docusaurus plugin - what it needs to do.md',
      'space/src/20240722005751 gpt on docusaurus sidebar-plugin.md',
      'space/src/20240723003043 docusaurus plugin - an even better plan.md',
      'space/src/20240723122006 docusaurus plugin - an even better plan ctd.md'
    ]
  },
  'obsidian/tags' => {
    name: 'obsidian/tags',
    files: [
      'space/src/20240722144345 Integration of docusaurus and obsidian vault.md',
      'space/src/20240722160139 obsidian tags to docusaurus map.md'
    ]
  },
  'dev/web/portfolio' => {
    name: 'dev/web/portfolio',
    files: [
      'space/src/20240722213731 docusaurus plugin - what it needs to do.md',
      'space/src/20240722005751 gpt on docusaurus sidebar-plugin.md',
      'space/src/20240723003043 docusaurus plugin - an even better plan.md',
      'space/src/20240723122006 docusaurus plugin - an even better plan ctd.md'
    ]
  },
  'by_ai' => {
    name: 'by_ai',
    files: [ 'space/src/20240722005751 gpt on docusaurus sidebar-plugin.md' ]
  }
}
```

Already sorted, and ready to be converted to sidebar, continuing from [docusaurus plugin - an even better plan ctd](/docs/20240723122006-docusaurus-plugin---an-even-better-plan-ctd)

Notes and checklist:
- [x] Change file names to proper docusaurus links ✅ 2024-07-24
- [ ] Break nested tags into category structure 🔺 
- [ ] After breaking them down, push appropriate doc into appropriate nested category


### Break nested tags, and convert to folder, how?
Hmm..

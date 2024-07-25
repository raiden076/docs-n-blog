---
tags:
  - docusaurus/sidebar
  - docusaurus/plugin
  - dev/web/portfolio/docs-n-blog
title: TagMap and enhanced sidebar
slug: 20240724133308-tagmap-and-enhanced-sidebar
id: 20240724133308-tagmap-and-enhanced-sidebar
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

Already sorted, and ready to be converted to sidebar, continuing from [docusaurus plugin - an even better plan ctd](/note/20240723122006-docusaurus-plugin---an-even-better-plan-ctd)

Notes and checklist:
- [x] Change file names to proper docusaurus links ✅ 2024-07-24
- [x] Break nested tags into category structure 🔺 ✅ 2024-07-25
- [x] After breaking them down, push appropriate doc into appropriate nested category ✅ 2024-07-25


### Break nested tags, and convert to folder, how?
Hmm..

By ai:

```js
const createAccessor = (obj) => {
  const getPathArray = (path) => path.split('/');

  const newKeys = {}; // Object to track newly added keys and their initial values

  const get = (path) => {
    return getPathArray(path).reduce((acc, part) => acc && acc[part] ? acc[part] : undefined, obj);
  };

  const set = (path, value) => {
    const parts = getPathArray(path);
    let createdNewKey = false;
    parts.reduce((acc, part, index) => {
      if (index === parts.length - 1) {
        acc[part] = value;
      } else {
        if (!acc[part]) {
          acc[part] = {};
          createdNewKey = true; // Flag that a new key is being created
        }
        return acc[part];
      }
    }, obj);
    if (createdNewKey) {
      newKeys[path] = value; // Track the path and value of the newly created key
    }
  };

  const append = (path, value) => {
    let currentValue = get(path);
    if (currentValue === undefined) {
      set(path, []);
      currentValue = [];
      newKeys[path] = currentValue; // Track newly initialized array
    }
    if (Array.isArray(currentValue)) {
      currentValue.push(value);
    } else {
      throw new Error('Append operation is only supported for arrays.');
    }
  };

  const exportObject = () => {
    return JSON.parse(JSON.stringify(obj)); // Return a deep copy of the object
  };

  const getNewKeys = () => {
    return newKeys; // Returns the object tracking new keys and their initial values
  };

  return { get, set, append, export: exportObject, getNewKeys };
};

```

Done.

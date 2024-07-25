import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import sidebar from "./sidebar.json";
/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.
 Create as many sidebars as you want.
 */

/**
 * Sorts the keys of an object alphabetically and returns a new object with the sorted keys and corresponding values.
 *
 * @param {object} obj - The object to be sorted.
 * @return {object} A new object with sorted keys and corresponding values.
 */
const sortObjectKeys = (obj) => {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};



const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // notesSidebar: [{type: 'autogenerated', dirName: '.'}],
  // sort the keys of the sidebar object alphabetically
  notesSidebar: sortObjectKeys(sidebar.sidebar)

  // But you can create a sidebar manually
  /*
  notesSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};


export default sidebars;

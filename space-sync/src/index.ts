import glob from 'glob';
import matter from 'gray-matter';
import * as fs from 'fs-extra';
import path from 'path';
import { Plugin, LoadContext } from "@docusaurus/types"
import { enableMapSet, produce } from "immer"

enableMapSet()

export interface MyPluginOptions {
  // this option will either be undefined or a boolean
  srcDir: string
}

export default async function (context: LoadContext, options: MyPluginOptions): Promise<Plugin> {
  return {
    name: 'space-sync',
    extendCli(cli) {
      // Register extra command(s) to enhance the CLI of Docusaurus
      cli
        .command("sync")
        .description("Sync obsidian docs and blogs with docusaurus")
        .action(async () => {
          await updateBlog(options.srcDir, context.siteDir);
          const tagMap = await updateDocs(options.srcDir, context.siteDir, context.baseUrl);
          // console.log("tagMap: ", tagMap);
          const sidebar = convertTagMapToSidebar(tagMap);
          console.log("generated sidebar:", JSON.stringify({ sidebar }, null, 2));
          await fs.writeJson(path.join(context.siteDir, "sidebar.json"), { sidebar }, { spaces: 2 });
        })
    },

  };
}

/**
 * Updates Markdown files in the specified directory by adding custom frontmatter and tags.
 *
 * @param {string} sourceDirectory - The directory path where the Markdown files are located (string)
 * @param {string} destinationDirectory - The directory path where the updated Markdown files should be written (string)
 * @param {string} baseUrl - The base URL to be used for creating the proper links (string)
 * @return {Promise<Map<string, { name: string, files: string[] }>>} A Promise containing the tagMap, from the obsidian vault after updates (Promise<Map<string, { name: string, files: string[] }>>)
 */
async function updateDocs(
  sourceDirectory: string,
  destinationDirectory: string,
  baseUrl: string
): Promise<Map<string, { name: string, files: string[] }>> {
  console.log(`Updating Markdown files in ${sourceDirectory}`);

  const sourcePath: string = path.join(sourceDirectory, "src");
  const destinationPath: string = path.join(destinationDirectory, "docs");
  const baseUrlPath: string = path.join(baseUrl, "docs");
  const markdownFiles: string[] = glob.sync(path.join(sourcePath, "/**/*.md"));
  const tagMap: Map<string, { name: string, files: string[] }> = new Map<string, { name: string, files: string[] }>();

  const promises: Promise<void>[] = markdownFiles.map(async (file: string) => {
    const content: string = await fs.readFile(file, 'utf8');
    const { data = {}, content: fileContent }: { data: { tags?: string[], [key: string]: any }, content: string } = matter(content);

    for (const tag of data.tags ?? []) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { name: tag, files: [file] });
      } else {
        tagMap.get(tag)!.files.push(file);
      }
    }

    const updatedFrontmatter: { title: string, slug: string, id: string } = {
      title: path.relative(sourcePath, file)
        .replace(/^\d+\s/, '')
        .replace(/\.md$/, ''),
      slug: path.relative(sourcePath, file)
        .replace(/\.md$/, '')
        .replace(/\s+/g, '-')
        .toLowerCase(),
      id: path.relative(sourcePath, file)
        .replace(/\.md$/, '')
        .replace(/\s+/g, '-')
        .toLowerCase(),
    };

    const updatedContent: string = matter.stringify(convertObsidianLinks(fileContent, baseUrlPath), { ...data, ...updatedFrontmatter });
    await fs.outputFile(path.join(destinationPath, path.relative(sourcePath, file)), updatedContent, 'utf8');
  });

  await Promise.all(promises);

  console.log(`Updated Markdown files in ${sourceDirectory}`);

  return tagMap;
}


/**
 * Updates the blog files by copying them from the source directory to the site directory,
 * using streams for efficient file copying.
 *
 * @param {string} srcDir - The source directory containing the blog files (string)
 * @param {string} siteDir - The destination directory for the blog files (string)
 * @return {Promise<void>} A Promise that resolves when the blog files have been updated
 */
const updateBlog = async (srcDir: string, siteDir: string): Promise<void> => {
  // Define paths for blog source and target directories
  const blogPath: string = path.join(srcDir, "blog");
  const blogTargetPath: string = path.join(siteDir, "blog");

  // Use createReadStream and createWriteStream to copy the blog files efficiently
  await Promise.all(glob.sync(path.join(blogPath, "/**/*.md")).map(async (file: string) => {
    try {
      await fs.createReadStream(file).pipe(fs.createWriteStream(path.join(blogTargetPath, path.relative(blogPath, file))));
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }));

  // Log a message indicating the completion of updating blog files
  console.log(`Updated blog files in ${srcDir}`);
}

/**
 * Converts Obsidian-style links ([[text]]) to Markdown-style links with URL-encoded docusaurus links.
 *
 * @param {string} input - The input string containing Obsidian-style links
 * @param {string} basePath - The base path to be used for creating the proper links
 * @returns {string} - The string with converted Markdown-style links
 */
const convertObsidianLinks = (input: string, basePath: string): string => {
  return input.replace(/\[\[(.*?)\]\]/g, (_match, p1) => {
    const text =
      p1.trim();
    const fullPath = path.join(
      basePath,
      text
        .replace(/\s+/g, '-')
        .toLowerCase()
    );
    const cleanedTitle = text.replace(/^\d+\s/, '');
    return `[${cleanedTitle}](${fullPath})`;
  });
}


/**
 * Create an accessor object for accessing and manipulating nested objects.
 * @param initialObject The initial object to create the accessor for.
 * @returns An object with get, set, append, exportObject, and getNewKeys functions.
 */
const createAccessor = <T extends Record<string, any>>(initialObject: T): {
  get: (path: string) => any;
  set: (path: string, value: any) => void;
  exportObject: () => T;
  getNewKeys: () => Record<string, any>;
} => {
  const getPathArray = (path: string): string[] => path.split('/');
  const accessor: {
    get: (path: string) => any;
    set: (path: string, value: any) => void;
    exportObject: () => T;
    getNewKeys: () => Record<string, any>;
    newKeys: Record<string, any>;
  } = {
    get: (path: string) => {
      return getPathArray(path).reduce((acc, part) => acc && acc[part] ? acc[part] : undefined, initialObject);
    },
    set: (path: string, value: any) => {
      const pathParts = getPathArray(path);
      let newKeyCreated = false;
      pathParts.reduce((acc, part, index) => {
        if (index === pathParts.length - 1) {
          acc[part] = value;
        } else {
          if (!acc[part]) {
            acc[part] = {};
            newKeyCreated = true;
          }
          return acc[part];
        }
      }, initialObject);
      if (newKeyCreated) {
        accessor.newKeys[path] = value;
      }
    },
    exportObject: () => {
      return JSON.parse(JSON.stringify(initialObject));
    },
    getNewKeys: () => {
      return accessor.newKeys;
    },
    newKeys: {}
  };
  return accessor;
};



/**
 * Converts a tag map to a Docusaurus sidebar object.
 * @param {Map<string, { name: string, files: string[] }>} tagMap - The tag map to convert
 * @returns {{ [key: string]: string[] }} - The converted sidebar object
 */
const convertTagMapToSidebar = <T extends Record<string, { name: string, files: string[] }>>(
  tagMap: Map<string, T[keyof T]>,
): { [key: string]: any } => {
  let sidebar: { [key: string]: string[] } = {};
  const accessor = createAccessor(sidebar);
  tagMap.forEach((tag) => {
    const fileSlugs = tag.files.map(file =>
      path.basename(file).replace(/\.md$/, '')
        .replace(/\s+/g, '-')
        .toLowerCase(),);
    accessor.set(tag.name, [accessor.get(tag.name), ...fileSlugs])
  });
  const sidebarWithNulls = accessor.exportObject();
  return removeNulls(sidebarWithNulls) as { [key: string]: any };
}


/**
 * Recursively removes null values from an object or array.
 * @param obj - The object or array to clean.
 * @returns The cleaned object or array.
 */
function removeNulls(obj: any[] | Record<string, any> | null): any[] | Record<string, any> | null {
  if (Array.isArray(obj)) {
    return obj.filter(item => item !== null).map(removeNulls);
  } else if (typeof obj === 'object' && obj !== null) {
    const cleanedObj: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value !== null) {
        cleanedObj[key] = removeNulls(value);
      }
    });
    return cleanedObj;
  }
  return obj;
}

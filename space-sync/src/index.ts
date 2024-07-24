import glob from 'glob';
import matter from 'gray-matter';
import * as fs from 'fs-extra';
import path from 'path';
import { Plugin, LoadContext } from "@docusaurus/types"

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
          console.log("tagMap: ", tagMap);
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

    const updatedFrontmatter: { title: string, slug: string } = {
      title: path.relative(sourcePath, file)
        .replace(/^\d+\s/, '')
        .replace(/\.md$/, ''),
      slug: path.relative(sourcePath, file)
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

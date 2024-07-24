"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const glob_1 = __importDefault(require("glob"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const immer_1 = require("immer");
(0, immer_1.enableMapSet)();
function default_1(context, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            name: 'space-sync',
            extendCli(cli) {
                // Register extra command(s) to enhance the CLI of Docusaurus
                cli
                    .command("sync")
                    .description("Sync obsidian docs and blogs with docusaurus")
                    .action(() => __awaiter(this, void 0, void 0, function* () {
                    yield updateBlog(options.srcDir, context.siteDir);
                    const tagMap = yield updateDocs(options.srcDir, context.siteDir, context.baseUrl);
                    // console.log("tagMap: ", tagMap);
                    const sidebar = convertTagMapToSidebar(tagMap);
                    console.log("generated sidebar:", JSON.stringify({ sidebar }, null, 2));
                    yield fs.writeJson(path_1.default.join(context.siteDir, "sidebar.json"), { sidebar }, { spaces: 2 });
                }));
            },
        };
    });
}
/**
 * Updates Markdown files in the specified directory by adding custom frontmatter and tags.
 *
 * @param {string} sourceDirectory - The directory path where the Markdown files are located (string)
 * @param {string} destinationDirectory - The directory path where the updated Markdown files should be written (string)
 * @param {string} baseUrl - The base URL to be used for creating the proper links (string)
 * @return {Promise<Map<string, { name: string, files: string[] }>>} A Promise containing the tagMap, from the obsidian vault after updates (Promise<Map<string, { name: string, files: string[] }>>)
 */
function updateDocs(sourceDirectory, destinationDirectory, baseUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Updating Markdown files in ${sourceDirectory}`);
        const sourcePath = path_1.default.join(sourceDirectory, "src");
        const destinationPath = path_1.default.join(destinationDirectory, "docs");
        const baseUrlPath = path_1.default.join(baseUrl, "docs");
        const markdownFiles = glob_1.default.sync(path_1.default.join(sourcePath, "/**/*.md"));
        const tagMap = new Map();
        const promises = markdownFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const content = yield fs.readFile(file, 'utf8');
            const { data = {}, content: fileContent } = (0, gray_matter_1.default)(content);
            for (const tag of (_a = data.tags) !== null && _a !== void 0 ? _a : []) {
                if (!tagMap.has(tag)) {
                    tagMap.set(tag, { name: tag, files: [file] });
                }
                else {
                    tagMap.get(tag).files.push(file);
                }
            }
            const updatedFrontmatter = {
                title: path_1.default.relative(sourcePath, file)
                    .replace(/^\d+\s/, '')
                    .replace(/\.md$/, ''),
                slug: path_1.default.relative(sourcePath, file)
                    .replace(/\.md$/, '')
                    .replace(/\s+/g, '-')
                    .toLowerCase(),
                id: path_1.default.relative(sourcePath, file)
                    .replace(/\.md$/, '')
                    .replace(/\s+/g, '-')
                    .toLowerCase(),
            };
            const updatedContent = gray_matter_1.default.stringify(convertObsidianLinks(fileContent, baseUrlPath), Object.assign(Object.assign({}, data), updatedFrontmatter));
            yield fs.outputFile(path_1.default.join(destinationPath, path_1.default.relative(sourcePath, file)), updatedContent, 'utf8');
        }));
        yield Promise.all(promises);
        console.log(`Updated Markdown files in ${sourceDirectory}`);
        return tagMap;
    });
}
/**
 * Updates the blog files by copying them from the source directory to the site directory,
 * using streams for efficient file copying.
 *
 * @param {string} srcDir - The source directory containing the blog files (string)
 * @param {string} siteDir - The destination directory for the blog files (string)
 * @return {Promise<void>} A Promise that resolves when the blog files have been updated
 */
const updateBlog = (srcDir, siteDir) => __awaiter(void 0, void 0, void 0, function* () {
    // Define paths for blog source and target directories
    const blogPath = path_1.default.join(srcDir, "blog");
    const blogTargetPath = path_1.default.join(siteDir, "blog");
    // Use createReadStream and createWriteStream to copy the blog files efficiently
    yield Promise.all(glob_1.default.sync(path_1.default.join(blogPath, "/**/*.md")).map((file) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fs.createReadStream(file).pipe(fs.createWriteStream(path_1.default.join(blogTargetPath, path_1.default.relative(blogPath, file))));
        }
        catch (error) {
            console.error(`Error processing file ${file}:`, error);
        }
    })));
    // Log a message indicating the completion of updating blog files
    console.log(`Updated blog files in ${srcDir}`);
});
/**
 * Converts Obsidian-style links ([[text]]) to Markdown-style links with URL-encoded docusaurus links.
 *
 * @param {string} input - The input string containing Obsidian-style links
 * @param {string} basePath - The base path to be used for creating the proper links
 * @returns {string} - The string with converted Markdown-style links
 */
const convertObsidianLinks = (input, basePath) => {
    return input.replace(/\[\[(.*?)\]\]/g, (_match, p1) => {
        const text = p1.trim();
        const fullPath = path_1.default.join(basePath, text
            .replace(/\s+/g, '-')
            .toLowerCase());
        const cleanedTitle = text.replace(/^\d+\s/, '');
        return `[${cleanedTitle}](${fullPath})`;
    });
};
/**
 * Create an accessor object for accessing and manipulating nested objects.
 * @param initialObject The initial object to create the accessor for.
 * @returns An object with get, set, append, exportObject, and getNewKeys functions.
 */
const createAccessor = (initialObject) => {
    const getPathArray = (path) => path.split('/');
    const accessor = {
        get: (path) => {
            return getPathArray(path).reduce((acc, part) => acc && acc[part] ? acc[part] : undefined, initialObject);
        },
        set: (path, value) => {
            const pathParts = getPathArray(path);
            let newKeyCreated = false;
            pathParts.reduce((acc, part, index) => {
                if (index === pathParts.length - 1) {
                    acc[part] = value;
                }
                else {
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
const convertTagMapToSidebar = (tagMap) => {
    let sidebar = {};
    const accessor = createAccessor(sidebar);
    tagMap.forEach((tag) => {
        const fileSlugs = tag.files.map(file => path_1.default.basename(file).replace(/\.md$/, '')
            .replace(/\s+/g, '-')
            .toLowerCase());
        accessor.set(tag.name, [accessor.get(tag.name), ...fileSlugs]);
    });
    const sidebarWithNulls = accessor.exportObject();
    return removeNulls(sidebarWithNulls);
};
/**
 * Recursively removes null values from an object or array.
 * @param obj - The object or array to clean.
 * @returns The cleaned object or array.
 */
function removeNulls(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(item => item !== null).map(removeNulls);
    }
    else if (typeof obj === 'object' && obj !== null) {
        const cleanedObj = {};
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

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, relative, join } from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const indexNavigationMap = new Map();
const filePathMap = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const baseDir = path.resolve(process.cwd(), 'docs');  // Read from "docs/" to preserve order
const outputFile = path.resolve(__dirname, '..', '.vitepress', 'sidebar.json');

const ignoredDirs = ['node_modules', '.vitepress', '.git', 'public'];
const collapsedSections = ['releases', 'authentication', 'howtos', 'faq', 'tools-and-code', 'probeinfo', 'rest-api-manual', 'rest-api-reference', 'measurements', 'probes', 'credits'];
const processedSections = [];

const replacementTable = {
  'data api': 'Data API',
  'getting started': 'Getting Started',
  'faq': 'FAQ',
  'howtos': 'How To',
  'tools and code': 'Tools + Code',
  'probeinfo': 'Probe Versions',
  'apis': 'APIs',
};

function applyReplacements(text) {
  const lowerCaseText = text.toLowerCase();
  const replacedText = replacementTable[lowerCaseText] || text;
  return replacedText.charAt(0).toUpperCase() + replacedText.slice(1);
}

function removeNumbers(str) {
  return str.replace(/(^|\/)\d+\.(?!md)/g, '$1');
}

function extractTitleFromFrontmatter(filePath) {
  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return data.title || null;
  } catch (error) {
    console.error(`Error reading frontmatter from ${filePath}:`, error);
    return null;
  }
}

function generateIndexFile(dir) {
  console.log(`📝 Generating/updating index.md for: ${dir}`);
  const indexFile = path.join(dir, 'index.md');

  // Get all markdown files in the directory (excluding index.md)
  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort((a, b) => b.localeCompare(a));

  if (files.length === 0) return; // No need to generate if no files exist

  // Extract the base folder name without the "_index" suffix
  const baseName = path.basename(dir).replace(/_index$/, '').replace(/-/g, ' ');

  // Get the relative path from baseDir
  const fullRelativePath = path.relative(baseDir, dir).replace(/\\/g, '/');

  // Prepare the links section
  const linksContent = files.map(file => {
    const fileName = file.replace(/\.md$/, '');
    return `- [${fileName}](/${fullRelativePath}/${fileName})`;
  }).join('\n');

  let finalContent = `# ${baseName}\n\n${linksContent}\n`;

  // Check if the file already exists
  if (fs.existsSync(indexFile)) {
    const existingContent = fs.readFileSync(indexFile, 'utf8');
    const { data: frontmatter, content } = matter(existingContent);

    // Preserve frontmatter if it exists
    if (Object.keys(frontmatter).length > 0) {
      const frontmatterString = matter.stringify('', frontmatter).trim();
      finalContent = `${frontmatterString}\n\n${finalContent}`;
    }
  }

  // Write the updated index file
  fs.writeFileSync(indexFile, finalContent);
  console.log(`✅ Updated index file at ${indexFile}`);
}

let allOrderedFiles = [];

function generateSidebar(dir) {
  // First, collect all section data to ensure navigation works correctly
  if (dir === baseDir) {
    collectAllSectionData(dir);
  }

  const sidebar = [];
  const files = readdirSync(dir);

  const numberedFiles = files.filter(file => /^\d+\./.test(file) && !ignoredDirs.includes(file));
  const nonNumberedFiles = files.filter(file => !/^\d+\./.test(file) && !ignoredDirs.includes(file));

  numberedFiles.sort((a, b) => {
    const aMatch = a.match(/^(\d+)/);
    const bMatch = b.match(/^(\d+)/);
    if (aMatch && bMatch) {
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    return a.localeCompare(b);
  });

  nonNumberedFiles.sort((a, b) => a.localeCompare(b));

  const processFiles = (filesToProcess) => {
    filesToProcess.forEach(file => {
      if (file === 'index.md') return;

      const fullPath = join(dir, file);
      if (statSync(fullPath).isDirectory()) {
        let folderName = removeNumbers(file);
        const isCollapsed = collapsedSections.includes(folderName);
        const isIndexFolder = file.endsWith('_index');

        let relativePath = relative(baseDir, fullPath).replace(/\\/g, '/');

        // Track and write navigation for all directories
        trackIndexFiles(fullPath);
        writeNavigationToFrontmatter(fullPath);
        console.log(`📂 Processing directory: ${fullPath}`);

        // Special case: If an _index folder is inside a numbered parent, remove the parent's number
        const pathSegments = relativePath.split('/');
        if (pathSegments.length > 1 && isIndexFolder) {
          console.log(`🛠 Fixing sidebar path for _index: ${relativePath}`);
          pathSegments[pathSegments.length - 2] = removeNumbers(pathSegments[pathSegments.length - 2]);
          relativePath = pathSegments.join('/');
        }

        if (isIndexFolder) {
          generateIndexFile(fullPath);
          const baseName = folderName.replace(/_index$/, '');

          let indexLink = `/${relativePath}/`; // Ensure consistent trailing slash
          let normalizedPath = relativePath.replace(/\/$/, '') + '/'; // Ensure single trailing slash

          // Ensure `_index` page is only added ONCE (with a consistent slash)
          if (!allOrderedFiles.some(item => item === normalizedPath)) {
            allOrderedFiles.push(normalizedPath);
          } else {
            console.warn(`⚠️ Skipping duplicate _index entry: ${normalizedPath}`);
          }

          sidebar.push({
            text: applyReplacements(baseName.replace(/-/g, ' ')),
            link: indexLink,
          });

          // Process children AFTER adding `_index`
          const indexChildren = generateSidebar(fullPath);
          indexChildren.forEach(child => {
            if (child && child.link) {
              let cleanChildLink = child.link.replace(/^\//, '');
              const standardizedChildLink = cleanChildLink.replace(/\/$/, '');
              if (!allOrderedFiles.includes(standardizedChildLink)) {
                allOrderedFiles.push(standardizedChildLink);
              }
            }
          });
        }  else {
          const children = generateSidebar(fullPath);
          if (children.length > 0) {
            sidebar.push({
              text: applyReplacements(folderName.replace(/-/g, ' ')),
              collapsible: true,
              collapsed: isCollapsed,
              items: children,
            });

            // Add child items in order
            children.forEach(child => {
              if (child && child.link) {
                const standardizedLink = child.link.replace(/^\//, '').replace(/\/$/, '');
                allOrderedFiles.push(standardizedLink);
              } else {
                console.warn(`⚠️ Skipping invalid child entry:`, child);
              }
            });
          }
        }
      } else if (file.endsWith('.md')) {
        let relativePath = relative(baseDir, fullPath);
        let originalPath = relativePath.replace(/\.md$/, '');
        let cleanPath = removeNumbers(originalPath);

        filePathMap.set(cleanPath, originalPath); // Store the mapping

        const link = `/${cleanPath}/`;

        const frontmatterTitle = extractTitleFromFrontmatter(fullPath);
        const defaultTitle = applyReplacements(removeNumbers(file).replace(/\.md$/, '').replace(/-/g, ' '));

        // **Ensure all Markdown files are added**
        allOrderedFiles.push(cleanPath.replace(/\/$/, ''));

        sidebar.push({
          text: frontmatterTitle || defaultTitle,
          link: link,
        });

        try {
          const gitTime = execSync(`git log -1 --format=%ct "${fullPath}"`, { encoding: 'utf-8' }).trim();
          if (gitTime) {
            //const lastUpdated = Number(gitTime) * 1000; // Convert to ms
            const fileContent = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContent);
            //data.lastUpdated = lastUpdated;
            const updatedContent = matter.stringify(content, data);
            fs.writeFileSync(fullPath, updatedContent, 'utf8');
            console.log(`🕒 Updated lastUpdated in ${fullPath}`);
          }
        } catch (e) {
          console.warn(`⚠️ Unable to fetch lastUpdated for ${fullPath}`);
        }
      }
    });
  };

  processFiles(numberedFiles);
  processFiles(nonNumberedFiles);
  console.dir(allOrderedFiles, { depth: null, maxArrayLength: null });
  // Final Safety Check for Duplicates: Remove any re-appended _index sections
  allOrderedFiles = [...new Set(allOrderedFiles.filter(item => !item.endsWith('_index')))];
  console.log("🔍 Final Ordered Files:", allOrderedFiles);
  return sidebar;
}

function standardizeDate(filename) {
  // Check if it's a 4-digit year that's also valid (not greater than current year)
  const currentYear = new Date().getFullYear();
  if (/^\d{4}$/.test(filename) && parseInt(filename) <= currentYear) {
    return `${filename}-01-01`; // Convert year-only to YYYY-01-01
  }
  return filename;
}

function trackIndexFiles(dir) {
  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort((a, b) => {
      const aName = a.replace('.md', '');
      const bName = b.replace('.md', '');

      const aDateStr = standardizeDate(aName);
      const bDateStr = standardizeDate(bName);

      if (/^\d{4}(-\d{2}-\d{2})?$/.test(aDateStr) && /^\d{4}(-\d{2}-\d{2})?$/.test(bDateStr)) {
        return new Date(bDateStr) - new Date(aDateStr);
      }

      return a.localeCompare(b);
    });

  const relativePath = path.relative(baseDir, dir).replace(/\\/g, '/');

  const orderedFiles = files.map(file => `/${relativePath}/${file.replace(/\.md$/, '')}`);

  // **Debugging: Log which files are being tracked**
  // console.log(`📌 Tracking index files in ${dir}:`, orderedFiles);

  const sectionName = path.basename(dir); // Store section name
  indexNavigationMap.set(dir, { section: sectionName, files: orderedFiles });
}

function collectAllSectionData(rootDir) {
  console.log("Collecting all section data for navigation...");

  // Get all top-level directories in order
  const topLevelDirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dir => !ignoredDirs.includes(dir))
    .sort((a, b) => {
      const aMatch = a.match(/^(\d+)/);
      const bMatch = b.match(/^(\d+)/);

      if (aMatch && bMatch) {
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      }

      return a.localeCompare(b);
    });

  // Process each directory to collect its files
  for (const dir of topLevelDirs) {
    const fullPath = path.join(rootDir, dir);
    trackIndexFiles(fullPath);
    processedSections.push(fullPath);

    // Also track for subdirectories - especially for index folders
    const subdirs = fs.readdirSync(fullPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(fullPath, dirent.name));

    for (const subdir of subdirs) {
      trackIndexFiles(subdir);
    }
  }
}

function writeNavigationToFrontmatter() {
  console.log("➡ Updating frontmatter for all files using global order");

  function isInIndexFolder(filePath) {
    return filePath.includes('_index/');
  }

  allOrderedFiles.forEach((filePath, index) => {
    const originalFilePath = filePathMap.get(filePath) || filePath;
    const fullPath = path.join(baseDir, originalFilePath + '.md');

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ File does not exist: ${fullPath}`);
      return;
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    if (data.disableNavRewrite) {
      console.log(`🚫 Skipping navigation update for ${fullPath} (disableNavRewrite: true)`);
      return;
    }

    function formatTitle(filename, siblingTitle) {
      if (siblingTitle) return siblingTitle;
      const cleanName = filename.replace(/^\d+\./, '').replace(/\.md$/, '').replace(/-/g, ' ');
      return applyReplacements(cleanName);
    }

    const inIndexFolder = isInIndexFolder(filePath);

    if (inIndexFolder) {
      // Reverse prev/next for _index folders
      if (index < allOrderedFiles.length - 1) {
        const prevFile = allOrderedFiles[index + 1];
        data.prev = {
          text: formatTitle(path.basename(prevFile, '.md')),
          link: `/${prevFile}/`
        };
      } else {
        data.prev = {};
      }

      if (index > 0) {
        const nextFile = allOrderedFiles[index - 1];
        data.next = {
          text: formatTitle(path.basename(nextFile, '.md')),
          link: `/${nextFile}/`
        };
      } else {
        data.next = {};
      }
    } else {
      // Normal order for non-_index
      if (index > 0) {
        const prevFile = allOrderedFiles[index - 1];
        data.prev = {
          text: formatTitle(path.basename(prevFile, '.md')),
          link: `/${prevFile}/`
        };
      } else {
        data.prev = {};
      }

      if (index < allOrderedFiles.length - 1) {
        const nextFile = allOrderedFiles[index + 1];
        data.next = {
          text: formatTitle(path.basename(nextFile, '.md')),
          link: `/${nextFile}/`
        };
      } else {
        data.next = {};
      }
    }

    // Write updated frontmatter
    const updatedFrontmatter = `---\n${yaml.dump(data)}---\n`;
    fs.writeFileSync(fullPath, `${updatedFrontmatter}${content}`);
    console.log(`✅ Updated frontmatter in ${fullPath}`);
  });
}

// Generate the sidebar and save it to sidebar.json
const sidebarData = generateSidebar(baseDir);
writeFileSync(outputFile, JSON.stringify(sidebarData, null, 2));
console.log("✅ Sidebar generated and saved to sidebar.json");
// 🔥 Explicitly call writeNavigationToFrontmatter() after sidebar generation
console.log("🚀 Calling writeNavigationToFrontmatter() now...");
writeNavigationToFrontmatter();
console.log("✅ Updated frontmatter with prev/next links.");
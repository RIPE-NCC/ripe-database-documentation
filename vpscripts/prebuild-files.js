import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import matter from 'gray-matter';
import {exec} from "child_process";
// Manually define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, '..', 'docs'); // Source: docs/ (at project root)
const buildDir = path.resolve(__dirname, '..', 'prebuild'); // Destination: prebuild/ (at project root)

function removeNumbers(str) {
  return str.replace(/(^|\/)\d+\.(?!md)/g, '$1');
}

function transformDiagram(file, srcDir, destDir){
  const inputPath = path.join(srcDir, file);
  const outputPath = path.join(destDir, file.replace(/\.mmd$/, '.svg'));

  const cmd = `npx mmdc -i "${inputPath}" -o "${outputPath}" --puppeteerConfigFile ./vpscripts/puppeteer-config.json`;
  console.log(cmd)
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`Failed to generate diagram from ${inputPath}:`, stderr);
    } else {
      console.log(`Generated diagram: ${outputPath}`);
    }
  });
}

function processFile(isImage, isMmd, srcDir, destDir, file){
  if (!isImage && !isMmd) {
    return removeNumbers(file); // Remove numbers from
    // non-image files
  }
  if (isMmd) {
    transformDiagram(file, srcDir, destDir); // Transform .mmd into .svg
  }
  return file;
}

function getSiblingFrontmatter(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const {data} = matter(fileContent);
      return data;
    }
  } catch (error) {
    console.error(`Error reading frontmatter from ${filePath}:`, error);
  }
  return null;
}

// Recursively delete `prebuild/` before copying new files
function cleanPrebuildDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, {recursive: true, force: true});
  }
  fs.mkdirSync(dir, {recursive: true});
}

function processDirectory(srcDir, destDir) {
  const files = fs.readdirSync(srcDir);

  // Ensure destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {recursive: true});
  }

  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const isImage = /\.(png|jpe?g|gif|svg)$/i.test(file);
    const isMmd = /\.(mmd)$/i.test(file);
    const cleanFileName = processFile(isImage, isMmd, srcDir, destDir, file)
    const destPath = path.join(destDir, cleanFileName);

    if (fs.statSync(srcPath).isDirectory()) {
      processDirectory(srcPath, destPath); // Recursively process directories
    } else {
      fs.copyFileSync(srcPath, destPath); // Copy files as-is
    }
  });
}

function fixNavigationLinks(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      fixNavigationLinks(fullPath); // Recurse into subdirectories
    } else if (file.endsWith('.md')) {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const {data, content} = matter(fileContent);

      let updated = false;

      function cleanLinkPath(filePath) {
        return removeNumbers(filePath); // Remove leading numbers from link paths
      }

      function cleanText(text) {
        return removeNumbers(text); // Ensure text also removes numbers
      }

      function capitalizeTitle(text) {
        if (!text) return text;
        const cleanedText = text.replace(/-/g, ' ');
        return cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
      }

      // **Fix Frontmatter prev/next unless disableNavRewrite is set**
      if (!data.disableNavRewrite) {
        const prevFilePath = data.prev?.link ? path.join(dir, `${data.prev.link}.md`) : null;
        const nextFilePath = data.next?.link ? path.join(dir, `${data.next.link}.md`) : null;

        const prevSiblingFrontmatter = prevFilePath ? getSiblingFrontmatter(prevFilePath) : null;
        const nextSiblingFrontmatter = nextFilePath ? getSiblingFrontmatter(nextFilePath) : null;
        if (data.prev) {
          if (data.prev.text) {
            const cleanPrevText = prevSiblingFrontmatter?.title || (/[A-Z]/.test(data.prev.text) ? data.prev.text : capitalizeTitle(data.prev.text));
            if (cleanPrevText !== data.prev.text) {
              console.log(`🔗 Fixing prev text in ${file}: ${data.prev.text} → ${cleanPrevText}`);
              data.prev.text = cleanPrevText;
              updated = true;
            }
          }
          if (data.prev.link) {
            const cleanPrevLink = cleanLinkPath(data.prev.link);
            if (cleanPrevLink !== data.prev.link) {
              console.log(`🔗 Fixing prev link in ${file}: ${data.prev.link} → ${cleanPrevLink}`);
              data.prev.link = cleanPrevLink;
              updated = true;
            }
          }
        }

        if (data.next) {
          if (data.next.text) {
            const cleanNextText = nextSiblingFrontmatter?.title || (/[A-Z]/.test(data.next.text) ? data.next.text : capitalizeTitle(data.next.text));
            if (cleanNextText !== data.next.text) {
              console.log(`🔗 Fixing next text in ${file}: ${data.next.text} → ${cleanNextText}`);
              data.next.text = cleanNextText;
              updated = true;
            }
          }
          if (data.next.link) {
            const cleanNextLink = cleanLinkPath(data.next.link);
            if (cleanNextLink !== data.next.link) {
              console.log(`🔗 Fixing next link in ${file}: ${data.next.link} → ${cleanNextLink}`);
              data.next.link = cleanNextLink;
              updated = true;
            }
          }
        }
      } else {
        console.log(`🚫 Skipping navigation update for ${file} (disableNavRewrite: true)`);
      }

      // **Fix links inside Markdown content unless disableLinkRewrite is set**
      let cleanedContent = content;
      if (!data.disableLinkRewrite) {
        cleanedContent = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, link) => {
          const cleanLink = cleanLinkPath(link);
          if (cleanLink !== link) {
            console.log(`🔗 Fixing content link in ${file}: ${link} → ${cleanLink}`);
            updated = true;
          }
          return `[${text}](${cleanLink})`;
        });
      } else {
        console.log(`🚫 Skipping link rewrite for ${file} (disableLinkRewrite: true)`);
      }

      if (updated) {
        const updatedFrontmatter = `${matter.stringify(cleanedContent, data)}`;
        fs.writeFileSync(fullPath, updatedFrontmatter, 'utf8');
      }
    }
  });
}


function preprocessDocs() {
  console.log('🔄 Cleaning prebuild directory...');
  cleanPrebuildDir(buildDir); // Start fresh

  processDirectory(sourceDir, buildDir);
  console.log('✅ Preprocessing completed: Everything copied with numbers stripped.');

  console.log('🔍 Fixing prev/next links inside _index folders...');
  fixNavigationLinks(buildDir);
  console.log('✅ Prev/next links cleaned.');
}

// Run the script
preprocessDocs();
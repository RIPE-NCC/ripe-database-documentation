import { defineConfig } from 'vitepress'
import { SearchPlugin } from "@technical-design/ncc-vitepress-plugin-search";
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml';
import matter from 'gray-matter';
import sidebar from './sidebar.json';
import { exec } from 'child_process';
import chokidar from 'chokidar';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { execSync } from 'child_process';

const sidebarPath = './sidebar.json';
const newSidebarData = JSON.stringify(sidebar, null, 2); // Replace with actual sidebar logic

if (fs.existsSync(sidebarPath)) {
  const existingContent = fs.readFileSync(sidebarPath, 'utf8');
  if (existingContent === newSidebarData) {
    console.log('🛑 No changes in sidebar.json, skipping update.');
  } else {
    fs.writeFileSync(sidebarPath, newSidebarData);
    console.log('✅ Sidebar updated.');
  }
}

fs.writeFileSync(sidebarPath, newSidebarData);
console.log('✅ Sidebar updated.');

const baseDir = "/"

// Search plugin options
var options = {
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
  allow: [],
  ignore: [],
};

function removeNumbers(str) {
  return str.replace(/(^|\/)\d+\.(?!md)/g, '$1');
}

// Function to generate route rewrites based on the directory structure
function generateRewrites(dir) {
  const rewrites = {};

  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(currentDir, file.name);

      if (file.isDirectory()) {
        traverse(fullPath);
      } else if (file.name.endsWith('.md')) {
        const relativePath = path.posix.relative(dir, fullPath);
        const segments = relativePath.split('/');
        const lastIndex = segments.length - 1;

        const cleanedSegments = segments.map((segment, index) => {
          if (index === lastIndex) {
            // Processing the file name
            if (segment === 'index.md') {
              // Special handling for index.md
              return '';
            } else if (/^\d+\.md$/.test(segment)) {
              // If the file name is only numbers followed by '.md', keep the numbers
              return segment.replace(/\.md$/, '');
            } else {
              // Otherwise, remove leading numbers and the dot, then remove '.md'
              return segment.replace(/^\d+\./, '').replace(/\.md$/, '');
            }
          } else {
            // Processing directory names: remove leading numbers and the dot
            return segment.replace(/^\d+\./, '');
          }
        });

        // Join the cleaned segments into the cleaned path
        let cleanPath = cleanedSegments.filter(Boolean).join('/');
        
        // Ensure the root index doesn't get an empty string as its path
        if (relativePath === 'index.md') {
          cleanPath = '/';
        } else if (relativePath.endsWith('/index.md')) {
          cleanPath = '/' + removeNumbers(path.dirname(relativePath)) + '/'; // Preserve full folder path
        }

        // Ensure cleanPath is properly formatted for VitePress
        rewrites[`${baseDir}/${relativePath}`] = cleanPath;
      }
    }
  }

  // Start from the root directory
  traverse(dir);
  return rewrites;
}

function findOriginalUrl(url) {
  // Ensure the URL does not contain the base
  const cleanUrl = url.replace(new RegExp(`^${baseDir}/`), '');

  // Recursive function to search for the file in the directory tree
  function searchDir(currentDir, remainingUrl) {
    const files = fs.readdirSync(currentDir);

    for (let file of files) {
      const cleanFile = removeNumbers(file);
      const filePath = path.join(currentDir, file);

      // Check if it's a directory and recursively search within it
      if (fs.statSync(filePath).isDirectory()) {
        if (remainingUrl.startsWith(cleanFile)) {
          const newRemainingUrl = remainingUrl.slice(cleanFile.length + 1); // Account for the removed portion and slash
          const result = searchDir(filePath, newRemainingUrl);
          if (result) return result;
        }
      } else {
        // It's a file, check for a match
        if (remainingUrl.startsWith(cleanFile)) {
          const realUrl = `${baseDir}${filePath.replace(rootDir, '')}`; // Construct the real URL
          return realUrl + remainingUrl.slice(cleanFile.length); // Return the rewritten URL
        }
      }
    }

    return null;
  }

  return searchDir(rootDir, cleanUrl); // Start search from root directory
}


const rootDir = path.resolve(__dirname, '..', `.${baseDir}`)

let isProcessing = false;

let debounceTimer: NodeJS.Timeout | null = null;

function runPrebuildAndSidebar() {
  if (isProcessing) {
    console.log("⏳ Skipping redundant run while prebuild is in progress.");
    return;
  }

  // Clear any pending timer
  if (debounceTimer) clearTimeout(debounceTimer);
  
  // Set a new debounce timer
  debounceTimer = setTimeout(() => {
    isProcessing = true; // Prevent re-triggering itself
    console.log("🔄 Running generate-sidebar.js && prebuild-files.js...");
    
    exec('node vpscripts/generate-sidebar.js', (err, stdout, stderr) => {
      if (err) {
        console.error('❌ Error running generate-sidebar:', err);
        isProcessing = false;
        return;
      }
      
      console.log(stdout);
      console.error(stderr);
      
      // Run prebuild-files.js only after sidebar generation completes
      exec('node vpscripts/prebuild-files.js', (err2, stdout2, stderr2) => {
        isProcessing = false; // Allow future triggers
        
        if (err2) {
          console.error('❌ Error running prebuild-files:', err2);
          return;
        }
        
        console.log(stdout2);
        console.error(stderr2);
      });
    });
  }, 500); // 500ms debounce
}

// VitePress config export
export default withMermaid({
  title: "RIPE NCC DOCS",
  base: baseDir,
  srcDir: `./prebuild`,
  description: "Vitepress based RIPE Docs",
  ignoreDeadLinks: true,
  cleanUrls: true,
  appearance: false,
  lastUpdated: true,
  rewrites: generateRewrites(rootDir),
  themeConfig: {
    sidebar,
    router: {
      prefetchLinks: false, // Disable prefetching
    },
  },
  transformHtml(html, id, { pageData }) {
    const frontmatterHydrate = pageData.frontmatter?.hydrate;
    if (frontmatterHydrate == false) {
      // Remove <script> tags from the HTML output
      console.log("processing ", pageData.filePath)
      return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '');
    }
    return html;
  },
  transformPageData(pageData, ctx) {
    // Use frontmatter lastUpdated if it exists
    const frontmatterUpdated = pageData.frontmatter?.lastUpdated;

    if (frontmatterUpdated) {
      pageData.lastUpdated = frontmatterUpdated;
    }

    return pageData;
  },
  mermaid: {
    startOnLoad: true
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  buildEnd() {
  },

  // Vue and Vite configurations
  vue: {
    template: {
      compilerOptions: {
        // exclude from vue so we don't get warnings
        isCustomElement: (tag) =>
          ['CurrentFileName', 'ripe', 'app', 'user', 'mobile', 'legal', 'question', 'roll', 'mwc-','md-'].some((substring) =>
            tag.toLowerCase().includes(substring)
          )
      }
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true, // Ensure file changes are detected
        interval: 100, // Poll every 100ms (adjust if needed)
      },
   },
  build: {
    shouldPrefetch: () => false,
    rollupOptions: {
    }
  },
   resolve: {
    alias: {
      '@components': path.resolve(__dirname, './components'),
      '/imgs': path.resolve(__dirname, '../prebuild/public/imgs')
    }
  },
    define: {
      // Put your api server addy and whether to use credentials with calls here if you have one affects RestRepl component
      "process.env.API_SERVER": JSON.stringify(process.env.API_SERVER ?? "stat.ripe.net"),
      "process.env.USE_CREDENTIALS": JSON.stringify(process.env.USE_CREDENTIALS ?? false), // true for Atlas, false for stat
      "process.env.RESPONSE_BG_COLOR": JSON.stringify(process.env.RESPONSE_BG_COLOR ?? "#F5F5F5") // set background color for response in RestRepl
    },
      plugins: [
        SearchPlugin(options),
      {
        name: 'inject-file-info',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.md')) {
            const fullFileName = path.basename(id);
            const fileName = path.parse(fullFileName).name; // Remove extension
      
            // Use gray-matter to parse frontmatter
            const { content, data } = matter(code);
      
            // Ensure `fileName` is set in frontmatter
            data.fileName = fileName;
      
            // Convert updated frontmatter back to YAML
            const newFrontmatterString = `---\n${yaml.dump(data)}---\n`;
      
            // Return the updated frontmatter + markdown content
            return `${newFrontmatterString}${content}`;
          }
          return code;
        }
      },
      {
        name: 'suppress-missing-image-errors',
        resolveId(source) {
          // console.log(`🧩 Plugin active — resolveId called for: ${source}`);
          if ((source.startsWith('/imgs/') || source.startsWith('/images/')) && 
              /\.(png|jpg|jpeg|gif|svg)$/.test(source)) {
            // Adjust this path to match your project structure
            // If your images are in a directory at the root level
            const publicPath = path.resolve(__dirname, '../public', source);
            
            // Log the path so you can verify it's correct
            console.log(`🔍 Checking for image at: ${publicPath}`);
            
            if (!fs.existsSync(publicPath)) {
              console.log(`🖼️ Missing image: ${source} - using placeholder`);
              return source;
            }
          }
          return null;
        },
        load(id) {
          if ((id.startsWith('/imgs/') || id.startsWith('/images/')) && 
              /\.(png|jpg|jpeg|gif|svg)$/.test(id)) {
            // Return an empty module for missing images
            return 'export default "";';
          }
          return null;
        },
      }
    ]
  }
})
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

try {
  const sidebar = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.vitepress/sidebar.json'), 'utf8'));
  console.log(`📋 Loaded sidebar structure successfully`);

  const baseDir = path.resolve(process.cwd(), 'prebuild');
  const docsDir = path.resolve(process.cwd(), 'docs');
  const outputFile = path.join(docsDir, '99.all-docs-combined.md');

  // Track visited links, create a map for path to ID conversion, and track unresolved links
  const visitedLinks = new Set();
  const pathToIdMap = new Map();
  const unresolvedLinks = new Set();
  const discardedPages = new Set().add("/Legal-Information/");

  // Make sure output files are deleted
  ensureOutputFileDeleted(docsDir, baseDir);

  // Generate a unique section ID from a file path
  function generateSectionId(filePath) {
    // Remove extension if present
    filePath = filePath.replace(/\.md$/, '');
    // Convert to kebab-case for HTML IDs
    return `section-${filePath.replace(/[^\w\s-]/g, '-').toLowerCase()}`;
  }

  // Clean up any previous output files
  function ensureOutputFileDeleted(docsDir, baseDir) {
    const outputFile = path.join(docsDir, '99.all-docs-combined.md');
    const prebuildOutputFile = path.join(baseDir, 'all-docs-combined.md');

    console.log(`🔍 Ensuring clean output files`);

    // Delete file in docs directory if it exists
    try {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
        console.log(`🧹 Deleted previous output file in docs directory`);
      }
    } catch (error) {
      console.error(`❌ Failed to delete output file in docs directory: ${error.message}`);
    }

    // Delete file in prebuild directory if it exists
    try {
      if (fs.existsSync(prebuildOutputFile)) {
        fs.unlinkSync(prebuildOutputFile);
        console.log(`🧹 Deleted previous output file in prebuild directory`);
      }
    } catch (error) {
      console.error(`❌ Failed to delete output file in prebuild directory: ${error.message}`);
    }

    console.log(`✅ Output locations prepared successfully`);
    return outputFile;
  }

  // Build a comprehensive map of paths to section IDs
  function buildPathToIdMap(items) {
    // First, add all the direct items from the sidebar
    for (const item of items) {
      if (item.link) {
        // Skip the combined doc itself
        if (item.link.includes('all-docs-combined')) {
          continue;
        }

        // Make sure to normalize the path (trim trailing slashes)
        const normalizedPath = item.link.replace(/\/$/, '');
        const sectionId = generateSectionId(normalizedPath.replace(/^\/|\/$/g, ''));

        // Add the main path
        pathToIdMap.set(normalizedPath, sectionId);

        // Also add the path with trailing slash as alternate
        if (!normalizedPath.endsWith('/')) {
          pathToIdMap.set(normalizedPath + '/', sectionId);
        }

        // Add path with .md extension as an alternate form
        pathToIdMap.set(normalizedPath + '.md', sectionId);

        // Add path with .html extension as an alternate form
        pathToIdMap.set(normalizedPath + '.html', sectionId);

        // Add variants with hyphens instead of spaces in the path
        const hyphenPath = normalizedPath.replace(/\s+/g, '-');
        if (hyphenPath !== normalizedPath) {
          pathToIdMap.set(hyphenPath, sectionId);
          pathToIdMap.set(hyphenPath + '/', sectionId);
        }

        // Add variants with different case
        pathToIdMap.set(normalizedPath.toLowerCase(), sectionId);

        // Handle special case for appendices with different formats
        if (normalizedPath.includes('Appendix-')) {
          // Convert appendix paths like "/Appendices/01-Appendix-A--Syntax..." to "/Appendices/Appendix-A--Syntax..."
          const appendixPath = normalizedPath.replace(/\/\d+-/, '/');
          pathToIdMap.set(appendixPath, sectionId);
          pathToIdMap.set(appendixPath + '/', sectionId);

          // Also add variations without the double dash
          const singleDashPath = appendixPath.replace(/--/g, '-');
          pathToIdMap.set(singleDashPath, sectionId);
          pathToIdMap.set(singleDashPath + '/', sectionId);
        }
      }

      if (item.items && item.items.length > 0) {
        buildPathToIdMap(item.items);
      }
    }

    // Now scan the actual files in the filesystem for additional paths
    scanFileSystem(baseDir);
  }

  // Scan the filesystem for all .md files to build a more complete path map
  function scanFileSystem(dirPath, relativePath = '') {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relPath = path.join(relativePath, entry.name);

        // Skip the combined doc itself
        if (entry.name.includes('all-docs-combined')) {
          continue;
        }

        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          scanFileSystem(fullPath, relPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // For each .md file, add its path to the map if not already present
          let fileRelativePath = '/' + relPath.replace(/\.md$/, '');

          // Handle numbered prefixes in filenames (e.g., "01-Appendix-A")
          const numberedPrefixMatch = entry.name.match(/^(\d+)-(.*?)\.md$/);
          if (numberedPrefixMatch) {
            // Also add version without the numbered prefix
            const unnumberedPath = '/' + path.join(relativePath, numberedPrefixMatch[2]);
            fileRelativePath = '/' + relPath.replace(/\.md$/, '');

            if (!pathToIdMap.has(unnumberedPath)) {
              const sectionId = generateSectionId(fileRelativePath.replace(/^\/|\/$/g, ''));
              pathToIdMap.set(unnumberedPath, sectionId);
              pathToIdMap.set(unnumberedPath + '/', sectionId);
            }
          }

          if (!pathToIdMap.has(fileRelativePath)) {
            const sectionId = generateSectionId(fileRelativePath.replace(/^\/|\/$/g, ''));
            pathToIdMap.set(fileRelativePath, sectionId);
            pathToIdMap.set(fileRelativePath + '/', sectionId);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error scanning directory ${dirPath}:`, error);
    }
  }

  // Transform internal links to section anchors
  function transformInternalLinks(content, currentPath) {
    // Match markdown links: [text](url)
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      // Skip external links and mailto links
      if (url.startsWith('http') || url.startsWith('mailto:')) {
        return match;
      }

      // Handle direct anchor links within the same page
      if (url.startsWith('#')) {
        // For page-specific anchors, prepend the current section ID
        const sectionId = pathToIdMap.get('/' + currentPath) ||
          pathToIdMap.get('/' + currentPath + '/');

        if (sectionId && url.length > 1) { // Only if anchor is not just #
          const anchorWithoutHash = url.substring(1);
          return `[${text}](#${sectionId}--${anchorWithoutHash})`;
        }
        // Keep page-specific anchors as is for empty anchors (#)
        return match;
      }

      // Split URL into path and anchor parts
      let urlPath = url;
      let urlAnchor = '';
      const hashIndex = url.indexOf('#');

      if (hashIndex !== -1) {
        urlPath = url.substring(0, hashIndex);
        urlAnchor = url.substring(hashIndex);
      }

      // Handle relative paths
      let absolutePath;
      if (urlPath.startsWith('/')) {
        // Already an absolute path
        absolutePath = urlPath;
      } else {
        // Relative path - need to resolve against current path
        const currentDir = path.dirname('/' + currentPath);
        absolutePath = path.normalize(path.join(currentDir, urlPath));
        // Ensure it starts with /
        if (!absolutePath.startsWith('/')) {
          absolutePath = '/' + absolutePath;
        }
      }

      // Remove .md or .html extension if present
      absolutePath = absolutePath.replace(/\.(md|html)$/, '');

      // Try different variations of the path
      const pathVariations = [
        absolutePath,
        absolutePath + '/',
        absolutePath.replace(/\/$/, '')
      ];

      // Try each variation
      for (const pathVar of pathVariations) {
        if (pathToIdMap.has(pathVar)) {
          const sectionId = pathToIdMap.get(pathVar);

          // If there's an anchor, we need to handle it specially
          if (urlAnchor) {
            // For section anchors, we'll create a special ID format
            // that combines the section ID with the original anchor
            const anchorWithoutHash = urlAnchor.substring(1);
            if (anchorWithoutHash) {
              return `[${text}](#${sectionId}--${anchorWithoutHash})`;
            } else {
              return `[${text}](#${sectionId})`;
            }
          } else {
            // No anchor, just link to the section
            return `[${text}](#${sectionId})`;
          }
        }
      }

      // If path not found after all attempts, keep original but log warning only for paths without known URL schemes
      // This filters out links like 'javascript:' or 'data:'
      if (!/^[a-zA-Z]+:/.test(url)) {
        // Add this path to a list of unresolved links for reporting
        unresolvedLinks.add(absolutePath + (urlAnchor || ''));
      }
      return match;
    });
  }

  // Process headings to add section-specific anchors
  function processHeadings(content, sectionId) {
    // Look for markdown headings (# Heading) and HTML headings (<h1>Heading</h1>)

    // Process markdown headings first
    content = content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, headingText) => {
      // Generate an ID for this heading from its text
      const headingId = headingText.trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-'); // Replace spaces with hyphens

      // Add an HTML anchor before the heading
      return `<a id="${sectionId}--${headingId}"></a>\n${match}`;
    });

    // Process HTML headings
    content = content.replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (match, level, headingText) => {
      // Extract text content without HTML tags
      const textContent = headingText.replace(/<[^>]+>/g, '');

      // Generate an ID for this heading from its text
      const headingId = textContent.trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      // Add id attribute to the heading if it doesn't have one
      if (!/\sid=["'][^"']+["']/.test(match)) {
        return match.replace(/<h([1-6])/, `<h$1 id="${sectionId}--${headingId}"`);
      }
      return match;
    });

    return content;
  }

  // Read and process markdown content
  function readMarkdownContent(filePath, relativePath) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        return null;
      }

      // Read file as a raw string
      let fileContent = fs.readFileSync(filePath, 'utf8');

      try {
        // Extract content using gray-matter
        let { content } = matter(fileContent);

        // Create a map to store protected content
        const protectedMap = new Map();
        let placeholderCount = 0;

        // Function to create a placeholder
        const createPlaceholder = (content) => {
          const placeholder = `__PROTECTED_CONTENT_${placeholderCount++}__`;
          protectedMap.set(placeholder, content);
          return placeholder;
        };

        // STEP 1: Handle all script tags first
        content = content.replace(/<script\s+setup[^>]*>[\s\S]*?<\/script>/gi,
          (match) => createPlaceholder(`\`\`\`html\n${match}\n\`\`\``));

        content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,
          (match) => createPlaceholder(`\`\`\`html\n${match}\n\`\`\``));

        content = content.replace(/<template[^>]*>[\s\S]*?<\/template>/gi,
          (match) => createPlaceholder(`\`\`\`html\n${match}\n\`\`\``));

        // STEP 2: Find and protect all tables
        content = content.replace(
          /^\|.*\|[\s]*$(\n^\|[\s\-:\|]*\|[\s]*$)(\n^\|.*\|[\s]*$)*/gm,
          (match) => createPlaceholder(match)
        );

        // STEP 3: Protect code blocks
        content = content.replace(
          /```[\s\S]*?```/g,
          (match) => createPlaceholder(match)
        );

        // STEP 4: Protect inline code
        content = content.replace(
          /`[^`]+`/g,
          (match) => createPlaceholder(match)
        );

        // STEP 5: Find and protect all HTML tags that might have problems
        content = content.replace(
          /<([a-zA-Z][a-zA-Z0-9]*)([^>]*?)>/g,
          (match, tag, attributes) => {
            // If it's a problematic tag or has attributes that might cause issues
            if (attributes.includes(',') || attributes.includes(':')) {
              return createPlaceholder(match);
            }
            return match;
          }
        );

        // STEP 6: Basic formatting cleanup
        content = content
          .replace(/\n{4,}/g, '\n\n\n') // Normalize excessive newlines
          .replace(/\\</g, '&lt;')      // Escape < that might be confused as HTML
          .replace(/\\>/g, '&gt;');     // Escape > that might be confused as HTML

        // STEP 7: Transform internal links to section anchors
        content = transformInternalLinks(content, relativePath);

        // STEP 8: Restore all protected content
        for (let i = 0; i < 10; i++) { // Multiple passes to handle nested placeholders
          protectedMap.forEach((value, key) => {
            content = content.replace(key, value);
          });
        }

        return content.trim();
      } catch (matterError) {
        console.error(`❌ Error parsing frontmatter in ${filePath}:`, matterError);
        return fileContent.trim();
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      return `[Error processing file: ${error.message}]`;
    }
  }

  // Process the sidebar structure to build the combined document
  function processSidebar(items, depth = 0) {
    let combinedContent = '';
    const indent = '  '.repeat(depth);

    console.log(`${indent}📑 Processing ${items.length} items at depth ${depth}`);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.link) {
        // Skip the combined doc itself to avoid recursion
        if (item.link.includes('all-docs-combined')) {
          console.log(`${indent}⏩ Skipping the combined doc itself: ${item.link}`);
          continue;
        }

        if (discardedPages.has(item.link)){
          console.log(`${indent}⏩ Skipping discarded page: ${item.link}`);
          continue;
        }

        if (visitedLinks.has(item.link)) {
          console.warn(`${indent}⏩ Skipping already processed: ${item.link}`);
          continue;
        }
        visitedLinks.add(item.link);
      }

      if (item.items && item.items.length > 0) {
        combinedContent += processSidebar(item.items, depth + 1);
      }

      if (!item.link) {
        continue;
      }

      let relativeFilePath = item.link.replace(/^\/|\/$/g, '');
      const filePath = path.join(baseDir, `${relativeFilePath}.md`);

      if (fs.existsSync(filePath)) {
        console.log(`${indent}📄 Processing: ${filePath}`);
        const content = readMarkdownContent(filePath, relativeFilePath);

        if (content) {
          // Add the section ID for navigation
          const sectionId = pathToIdMap.get(item.link);

          // Process content to add all the section-specific anchors
          const processedContent = processHeadings(content, sectionId);

          combinedContent += `\n\n${'-'.repeat(80)}\n\n<div id="${sectionId}" class="section-title">${item.text || relativeFilePath}</div>\n\n${processedContent.trim()}\n\n${'-'.repeat(80)}\n\n`;
        }
      } else {
        console.warn(`${indent}⚠️ Missing file: ${filePath}`);
      }
    }

    return combinedContent;
  }

  // Generate a table of contents from the sidebar structure
  function generateTableOfContents(items, depth = 0) {
    let toc = '';

    if (depth === 0) {
      toc += '## Table of Contents\n\n';
    }

    for (const item of items) {
      // Skip the combined doc itself
      if (item.link && item.link.includes('all-docs-combined')) {
        continue;
      }

      if (item.link && pathToIdMap.has(item.link)) {
        const indent = '  '.repeat(depth);
        const sectionId = pathToIdMap.get(item.link);
        toc += `${indent}- [${item.text}](#${sectionId})\n`;
      }

      if (item.items && item.items.length > 0) {
        toc += generateTableOfContents(item.items, depth + 1);
      }
    }

    if (depth === 0) {
      toc += '\n' + '-'.repeat(80) + '\n\n';
    }

    return toc;
  }

  // Create the frontmatter for the combined document
  const frontmatter = `---
title: All Documentation Combined
outline:
  - 1
  - 1
vite:
  __data:
    pageData:
      frontmatter:
        vueCustomBlockContentLoaders: false
---\n\n`; // Add newline to separate from content

  // Create the download button for the combined document
  const downloadButton = [
    '<script>' +
    '<button id=\'downloadBtn\' onclick="(()=>{',
    'const sidebar=document.querySelector(\'.VPSidebar\');',
    'const contentBody=document.querySelector(\'.container .content-body\');',
    'const divider=document.querySelector(\'header .divider\');',
    'const button=document.getElementById(\'downloadBtn\');',
    'if(sidebar)sidebar.style.display=\'none\';',
    'if(contentBody)contentBody.style.display=\'none\';',
    'if(divider)divider.style.display=\'none\';',
    'const clone=document.documentElement.cloneNode(true);',
    'const cloneButton=clone.querySelector(\'#downloadBtn\');',
    'if(cloneButton)cloneButton.remove();',
    'const blob=new Blob([clone.outerHTML],{type:\'text/html\'});',
    'const link=document.createElement(\'a\');',
    'link.href=window.URL.createObjectURL(blob);',
    'link.download=\'combined-docs.html\';',
    'document.body.appendChild(link);',
    'link.click();',
    'document.body.removeChild(link);',
    'if(sidebar)sidebar.style.display=\'\';',
    'if(contentBody)contentBody.style.display=\'\';',
    'if(divider)divider.style.display=\'\';',
    '})()">📥 Download This Page as HTML</button>' +
    '</script>'
  ].join('');

  // Main function to generate the combined document
  function generateCombinedDoc() {
    console.log('🔄 Starting document generation process');

    // First, build the path-to-id mapping
    console.log('🔄 Building path to ID mapping...');
    buildPathToIdMap(sidebar);

    console.log('🔄 Processing sidebar structure...');
    let combinedContent = processSidebar(sidebar);

    if (!combinedContent.trim()) {
      console.warn('⚠️ No content was gathered.');
    } else {
      console.log(`📊 Generated combined content successfully`);

      // If there are unresolved links, report them at the end
      if (unresolvedLinks.size > 0) {
        console.log(`⚠️ Found ${unresolvedLinks.size} unresolved links:`);
        let i = 0;
        for (const link of unresolvedLinks) {
          if (i < 10) {
            console.log(`  - ${link}`);
          } else if (i === 10) {
            console.log(`  - ... and ${unresolvedLinks.size - 10} more`);
            break;
          }
          i++;
        }
      }

      // Table of contents is now optional
      // Uncomment the following lines if you want a TOC
      // const tableOfContents = generateTableOfContents(sidebar);
      // combinedContent = tableOfContents + combinedContent;

      console.log('💾 Writing final output file...');
      fs.writeFileSync(outputFile, frontmatter + downloadButton + combinedContent, { encoding: 'utf8', flag: 'w' });
      console.log(`✅ Combined document saved to ${outputFile}`);
    }
  }

  // Run the script
  generateCombinedDoc();

} catch (error) {
  console.error('❌ CRITICAL ERROR:', error);
  process.exit(1);
}
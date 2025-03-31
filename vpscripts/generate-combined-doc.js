import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

try {
  const sidebar = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.vitepress/sidebar.json'), 'utf8'));
  console.log(`📋 Loaded sidebar structure successfully`);

  const baseDir = path.resolve(process.cwd(), 'prebuild');
  const docsDir = path.resolve(process.cwd(), 'docs');
  const outputFile = path.join(docsDir, '99.all-docs-combined.md');
  ensureOutputFileDeleted(docsDir, baseDir);
  const visitedLinks = new Set();

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
      throw error;
    }

    // Delete file in prebuild directory if it exists
    try {
      if (fs.existsSync(prebuildOutputFile)) {
        fs.unlinkSync(prebuildOutputFile);
        console.log(`🧹 Deleted previous output file in prebuild directory`);
      }
    } catch (error) {
      console.error(`❌ Failed to delete output file in prebuild directory: ${error.message}`);
      throw error;
    }

    console.log(`✅ Output locations prepared successfully`);
    return outputFile;
  }

  function readMarkdownContent(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        return null;
      }

      // Read file as a raw string, preserving all characters
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

        // STEP 1: Handle all script tags first (critical for Vue SFC issue)
        content = content.replace(/<script\s+setup[^>]*>[\s\S]*?<\/script>/gi,
          (match) => createPlaceholder(`\`\`\`html\n${match}\n\`\`\``));

        content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,
          (match) => createPlaceholder(`\`\`\`html\n${match}\n\`\`\``));

        content = content.replace(/<template[^>]*>[\s\S]*?<\/template>/gi,
          (match) => createPlaceholder(`\`\`\`html\n${match}\n\`\`\``));

        // STEP 2: Find and protect all tables
        // This regex captures an entire Markdown table
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

        // content = content.replace(
        //   /`([^`]+?)`/g,
        //   (match) => createPlaceholder(match)
        // );

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

        // STEP 6: Basic formatting cleanup (minimal to avoid damaging content)
        content = content
          .replace(/\n{4,}/g, '\n\n\n') // Normalize excessive newlines
          .replace(/\\</g, '&lt;')      // Escape < that might be confused as HTML
          .replace(/\\>/g, '&gt;');     // Escape > that might be confused as HTML

        // STEP 7: Restore all protected content
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

  function processSidebar(items, depth = 0) {
    let combinedContent = '';
    const indent = '  '.repeat(depth);

    console.log(`${indent}📑 Processing ${items.length} items at depth ${depth}`);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.link) {
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
        const content = readMarkdownContent(filePath);

        if (content) {
          combinedContent += `\n\n${'-'.repeat(80)}\n\n<div class="section-title">${item.text || relativeFilePath}</div>\n\n${content.trim()}\n\n${'-'.repeat(80)}\n\n`;
        }
      } else {
        console.warn(`${indent}⚠️ Missing file: ${filePath}`);
      }
    }

    return combinedContent;
  }

  // Final safety check for any remaining issues
  function finalSafetyCheck(content) {
    // One last pass to ensure script tags are wrapped in code blocks
    content = content
      .replace(/<script\s+setup[^>]*>/gi, '`<script setup>`')
      .replace(/<\/script>/gi, '`</script>`')
      .replace(/<template>/gi, '`<template>`')
      .replace(/<\/template>/gi, '`</template>`');

    return content;
  }

  function generateCombinedDoc() {
    console.log('🔄 Starting document generation process');

    // try {
    //   if (fs.existsSync(outputFile)) {
    //     fs.unlinkSync(outputFile);
    //     console.log(`🧹 Deleted previous combined doc`);
    //   }
    // } catch (e) {
    //   console.error(`❌ Failed to delete previous combined doc:`, e);
    // }

    console.log('🔄 Processing sidebar structure...');
    let combinedContent = processSidebar(sidebar);

    if (!combinedContent.trim()) {
      console.warn('⚠️ No content was gathered.');
    } else {
      console.log(`📊 Generated combined content successfully`);

      // Apply final safety check
      // combinedContent = finalSafetyCheck(combinedContent);

      // Add frontmatter to prevent Vue parsing
      combinedContent = `

${combinedContent}`;

      const downloadButton = [
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
        '})()">📥 Download This Page as HTML</button>'
      ].join('');

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
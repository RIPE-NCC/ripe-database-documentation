import fs from 'fs';
import path from 'path';

export default function inlineSvgZoomPlugin() {
  return {
    name: 'vitepress-inline-svg-zoom',
    enforce: 'post',

    transformIndexHtml(html, { path: pagePath }) {
      return html.replace(/<svg-zoom\s+src="([^"]+)"\s*><\/svg-zoom>/g, (_, srcPath) => {
        const filePath = path.resolve('docs/.vitepress/dist', srcPath.replace(/^\//, ''));

        if (!fs.existsSync(filePath)) {
          console.warn(`[svg-zoom plugin] SVG not found at ${filePath}`);
          return `<div style="color:red">SVG not found: ${srcPath}</div>`;
        }

        const svgContent = fs.readFileSync(filePath, 'utf-8');
        return `
<div class="svg-zoom-container">
  <div class="zoom-controls">
    <button class="zoom-in">+</button>
    <button class="zoom-out">−</button>
  </div>
  <div class="svg-wrapper">
    ${svgContent}
  </div>
</div>`;
      });
    }
  };
}
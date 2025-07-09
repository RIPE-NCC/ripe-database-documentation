import fs from 'fs'
import path, {resolve} from 'path'
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const outDir = path.resolve(__dirname, '../.vitepress/dist')

function getAllHtmlFiles(dir){
  const result = []
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      // Avoid symlinks or recursive loops
      if (entry.isSymbolicLink?.()) continue

      if (entry.isDirectory()) {
        result.push(...getAllHtmlFiles(fullPath))
      } else if (entry.name.endsWith('.html')) {
        result.push(fullPath)
      }
    }
  } catch (err) {
    console.warn(`Failed to read dir "${dir}":`, err)
  }

  return result
}

function removePreloadLinks() {
  const files = getAllHtmlFiles(outDir)

  files.forEach((file) => {
    let html = fs.readFileSync(file, 'utf-8')

    const matches = html.match(
      /<link[^>]+rel="(?:preload|prefetch|modulepreload|preload stylesheet)"[^>]*?>/gi
    )

    if (matches?.length) {
      console.log(`[${path.relative(outDir, file)}] Removed:`)
      matches.forEach((m) => console.log('   ', m))

      html = html.replace(
        /<link[^>]+rel="(?:preload|prefetch|modulepreload)"[^>]*?>/gi,
        ''
      )

      fs.writeFileSync(file, html, 'utf-8')
    }
  })
}

removePreloadLinks()
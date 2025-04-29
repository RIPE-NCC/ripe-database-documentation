import path, {resolve} from "path";
import {exec} from "child_process";

const baseDir = path.resolve(process.cwd(), 'docs');  // Read from "docs/" to preserve order
const diagramsDir = path.resolve(baseDir, 'public/diagrams');
const diagrams = [
  {
    input: path.join(diagramsDir, 'route.mmd'),
    output: path.join(diagramsDir, 'route.svg'),
  }
];

function generateDiagrams() {
  console.log('🔍 Generating diagrams...');
  diagrams.forEach(({ input, output }) => {
    const cmd = `npx mmdc -i "${input}" -o "${output}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`Failed to generate diagram from ${input}:`, stderr);
      } else {
        console.log(`Generated diagram: ${output}`);
      }
    });
  });
  console.log('🔍 ...Diagrams generated');
}

generateDiagrams();
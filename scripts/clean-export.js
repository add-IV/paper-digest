// Turns raw n8n exports into the files kept in workflows/.
// Drops server metadata (incl. the owner's name/email in `shared`) and
// names files after the workflow instead of its id.
// usage: node clean-export.js <export dir> <workflows dir>
const fs = require('fs');
const path = require('path');

const [inDir, outDir] = process.argv.slice(2);
const fileNames = {
  PaperDigestMain1: 'paper-digest.json',
  PaperDigestErr01: 'error-alert.json',
};
const keep = ['id', 'name', 'nodes', 'connections', 'settings', 'pinData'];

for (const f of fs.readdirSync(inDir).filter((f) => f.endsWith('.json'))) {
  const wf = JSON.parse(fs.readFileSync(path.join(inDir, f), 'utf8'));
  const out = Object.fromEntries(keep.filter((k) => k in wf).map((k) => [k, wf[k]]));
  const name = fileNames[wf.id] ?? wf.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json';
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(out, null, 2) + '\n');
  console.log(`${f} -> ${name}`);
}

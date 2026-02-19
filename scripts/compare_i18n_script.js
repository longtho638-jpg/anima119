const fs = require('fs');
const path = require('path');

const enPath = path.join(process.cwd(), 'messages/en.json');
const viPath = path.join(process.cwd(), 'messages/vi.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const vi = JSON.parse(fs.readFileSync(viPath, 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    keys.push(newPrefix);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getKeys(obj[key], newPrefix));
    }
  }
  return keys;
}

const enKeys = new Set(getKeys(en));
const viKeys = new Set(getKeys(vi));

const missingInEn = [...viKeys].filter(k => !enKeys.has(k));
const missingInVi = [...enKeys].filter(k => !viKeys.has(k));

console.log('Missing in EN:', JSON.stringify(missingInEn, null, 2));
console.log('Missing in VI:', JSON.stringify(missingInVi, null, 2));

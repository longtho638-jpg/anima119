import fs from 'fs';
import path from 'path';

const enPath = path.join(process.cwd(), 'messages/en.json');
const viPath = path.join(process.cwd(), 'messages/vi.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const vi = JSON.parse(fs.readFileSync(viPath, 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const viKeys = getKeys(vi);

const missingInVi = enKeys.filter(key => !viKeys.includes(key));
const missingInEn = viKeys.filter(key => !enKeys.includes(key));

console.log('Missing in VI:', JSON.stringify(missingInVi, null, 2));
console.log('Missing in EN:', JSON.stringify(missingInEn, null, 2));

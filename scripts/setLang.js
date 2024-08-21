import * as fs from 'fs';
import * as path from 'path';

// Read files of folder
const files = fs.readdirSync('./resources/js/translation/languages');

// Write file
fs.writeFileSync(
  path.join('./resources/js/translation/langs.json'),
  JSON.stringify(files)
);

// eslint-disable-next-line no-console
console.log('langs.json created successfully with those files:\n', files);

let en_json = require('./public/locales/en/common.json');
let ar_json = require('./public/locales/ar/common.json');

const mergeTranslation = () => {
  // console.log('en_json count ', Object.keys(en_json).length);
  // console.log('ar_json count ', Object.keys(ar_json).length);
  let output = {};
  // for (key in en_json) {
  //   output[key] = [en_json[key], ar_json[key] || ''];
  // }

  output = Object.keys(en_json).map((key) => ([key, en_json[key], ar_json[key] || '']));

  // console.log('output --------', output);
  // console.log('output count ', Object.keys(output).length);

  const FileSystem = require('fs');
  FileSystem.writeFile('translations.csv', JSON.stringify(output), (e) => {
    if (e) throw e;
  });
};

mergeTranslation();

// const loadTranslationFromMergedFiles = () => {
// };

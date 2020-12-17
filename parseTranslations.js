let en_json = require('./public/locales/en/common.json');
let ar_json = require('./public/locales/ar/common.json');

const mergeTranslation = () => {
  const mergedTranslationJson = Object.keys(en_json).map((key) => ({
    key,
    english: en_json[key],
    arabic: ar_json[key] || '',
  }));

  console.log('output count ', Object.keys(output).length);

  const csv = require('fast-csv');

  let rowCount = 1;
  const csvStream = csv.format({ headers: true });
  csvStream.pipe(process.stdout).on('end', () => process.exit());
  mergedTranslationJson.map((entry) => {
    rowCount += 1;
    csvStream.write(entry);
  });
  csvStream.end();

  console.log(`Parsed ${rowCount} entry`);

  const FileSystem = require('fs');
  FileSystem.writeFile('translations.csv', csvStream, (e) => {
    if (e) throw e;
  });
};

const parseTranslationToJson = () => {
  const fs = require('fs');
  const path = require('path');
  const csv = require('fast-csv');
  const parsedData = [];
  fs.createReadStream(path.resolve(__dirname, 'translated.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => {
      const { key, english, arabic } = row;
      en_json[key] = english;
      ar_json[key] = arabic;
      console.log(row);
      parsedData.push(row);
    })
    .on('end', (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
      fs.writeFile('output_en.json', JSON.stringify(en_json), (e) => {
        if (e) throw e;
      });
      fs.writeFile('output_ar.json', JSON.stringify(ar_json), (e) => {
        if (e) throw e;
      });
    });
  console.log('read successfully');
};

// parseTranslationToJson();
// mergeTranslation();

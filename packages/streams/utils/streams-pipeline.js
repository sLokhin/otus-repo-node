import * as fs from 'node:fs';
import { pipeline, Transform } from 'node:stream';
import { extractWords, getVectorFromWords } from './filters.js';

const space = '\u0020';
const newLine = '\u000A';

function executeStreamsPipeline({ inputFilePath, outputFilePath }) {
  const readStream = fs.createReadStream(`${inputFilePath}.txt`, {
    encoding: 'utf8',
  });
  const writeStream = fs.createWriteStream(`${outputFilePath}-pipeline.txt`, {
    encoding: 'utf8',
  });

  const getWordsStream = new Transform({
    transform(chunk, encoding, callback) {
      const stringChunck = chunk.toString();

      const words = extractWords(stringChunck);
      const sortedWords = [...words].sort();

      const result = JSON.stringify(sortedWords);
      callback(null, result);
    },
  });

  const getVectorStream = new Transform({
    transform(chunk, encoding, callback) {
      const stringifyWordsArray = chunk.toString();

      const wordsArray = JSON.parse(stringifyWordsArray);
      const vector = getVectorFromWords(wordsArray);

      const result = Object.entries(vector).reduce((res, [key, value]) => {
        return res.concat(
          `{${space}${key}${space}:${space}${value}${space}},${newLine}`
        );
      }, '');

      callback(null, result);
    },
  });

  pipeline(readStream, getWordsStream, getVectorStream, writeStream, (err) => {
    if (err) {
      console.log('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  });
}

export { executeStreamsPipeline };

import * as fs from 'node:fs';
import { extractWords, getVectorFromWords } from './filters.js';

const newLine = '\u000A';

function executeStreams({ inputFilePath, outputFilePath }) {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: 'utf8',
  });
  const writeStream = fs.createWriteStream(outputFilePath, {
    encoding: 'utf8',
  });

  const words = [];

  readStream.on('data', (chunk) => {
    words.push(...extractWords(chunk));
  });

  readStream.on('end', () => {
    const sortedWords = [...words].sort();
    const vector = getVectorFromWords(sortedWords);

    const resultWords = words.reduce((res, word) => {
      return res.concat(`${word}${newLine}`);
    }, '');

    const resultSortedWords = sortedWords.reduce((res, word) => {
      return res.concat(`${word}${newLine}`);
    }, '');

    const resultVector = Object.values(vector).reduce((res, value) => {
      return res.concat(`${JSON.stringify(value)}${newLine}`);
    }, '');

    writeStream.write(`Words array:${newLine}${newLine}`);
    writeStream.write(resultWords);
    writeStream.write(newLine);
    writeStream.write(`Sorted words:${newLine}${newLine}`);
    writeStream.write(resultSortedWords);
    writeStream.write(newLine);
    writeStream.write(`Result vector:${newLine}${newLine}`);
    writeStream.write(resultVector);
    writeStream.write(newLine);
    writeStream.end('Close write stream\n');
  });

  readStream.on('error', (err) => {
    console.log(err.stack);
  });
}

export { executeStreams };

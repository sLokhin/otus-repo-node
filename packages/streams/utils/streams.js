import * as fs from 'node:fs';

const space = '\u0020';
const newLine = '\u000A';
const nonTextCharacters = ['.', ',', ':', ';', '%'];

const readStream = fs.createReadStream('../files/input-words', {
  encoding: 'utf8',
});
const writeStream = fs.createWriteStream('../files/output-words', {
  encoding: 'utf8',
});

const words = [];

readStream.on('data', (chunk) => {
  words.push(...extractWords(chunk));
});

readStream.on('end', () => {
  const result = words.reduce((res, word) => {
    return res.concat(`${word}${newLine}`);
  }, '');
  writeStream.write(result);
  writeStream.end('Close write stream\n');

  console.log(result);
});

readStream.on('error', (err) => {
  console.log(err.stack);
});

function extractWords(chunk) {
  return [].concat(
    ...chunk.split(newLine).map((line) => {
      const filteredLine = filterLine(line);
      const lineWords = getWordsFromLine(filteredLine);
      return lineWords;
    })
  );
}

function filterLine(line) {
  return nonTextCharacters.reduce((filteredLine, char) => {
    return filteredLine.split(char).join('');
  }, line);
}

function getWordsFromLine(line) {
  return line.split(space).filter((word) => Boolean(word));
}

import * as fs from 'node:fs';

const space = '\u0020';
const newLine = '\u000A';
const nonTextCharacters = ['.', ',', ':', ';', '%'];

const readStream = fs.createReadStream('../files/input-names', {
  encoding: 'utf8',
});
const writeStream = fs.createWriteStream('../files/output-names', {
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

function getVectorFromWords(words) {
  return words.reduce((vector, word) => {
    if (Object.prototype.hasOwnProperty.call(vector, word)) {
      vector[word].amount += 1;
    } else {
      vector[word] = { word, amount: 1 };
    }

    return vector;
  }, {});
}

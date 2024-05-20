const space = '\u0020';
const newLine = '\u000A';
const nonTextCharacters = ['.', ',', ':', ';', '%'];

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

export { extractWords, filterLine, getWordsFromLine, getVectorFromWords };

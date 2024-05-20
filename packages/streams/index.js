import { executeStreams } from './utils/streams.js';

const options = [
  {
    inputFilePath: './files/input-names',
    outputFilePath: './files/output-names',
  },
  {
    inputFilePath: './files/input-words',
    outputFilePath: './files/output-words',
  },
];

options.forEach((options) => {
  executeStreams(options);
});

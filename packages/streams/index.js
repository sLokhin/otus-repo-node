import { executeStreamsOrig } from './utils/streams-orig.js';
import { executeStreamsPipeline } from './utils/streams-pipeline.js';

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

function processDemoFiles() {
  options.forEach((options) => {
    executeStreamsOrig(options);
  });

  options.forEach((options) => {
    executeStreamsPipeline(options);
  });
}

processDemoFiles();

export { processDemoFiles };

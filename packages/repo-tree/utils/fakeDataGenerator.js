import { faker } from '@faker-js/faker';

function getRandomFileName() {
  return faker.system.fileName({
    extensionCount: { min: 1, max: 2 },
  });
}

function getRandomFolderName() {
  return faker.word.noun({
    length: { min: 5, max: 10 },
    strategy: 'longest',
  });
}

function getRandomNumber(min, max) {
  return faker.number.int({ min, max });
}

function getRandomBranch(currentDepth, maxDepth) {
  return {
    name: currentDepth ? getRandomFolderName() : 'Root',
    items: new Array(getRandomNumber(1, 3)).fill(null).map(() => {
      if (currentDepth < maxDepth) {
        return getRandomBranch(currentDepth + 1, maxDepth);
      } else {
        return { name: getRandomFileName() };
      }
    }),
  };
}

function getRandomData(maxDepth = 0) {
  return getRandomBranch(0, maxDepth);
}

export { getRandomData };

import { buildTree, getRandomData } from '@otus-repo-node/repo-tree';

const randomData = getRandomData(3);

console.log(randomData);
console.log(buildTree(randomData));

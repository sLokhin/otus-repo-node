// Создание NPM пакета для показа дерева

// Цель:
// написать функцию для показа древовидной структуры. Выполнить одну из двух предложенных примеров задач

import { buildTree } from '@otus-repo-node/repo-tree';

const data = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
};

console.log('Build tree function');
console.log(buildTree(data));

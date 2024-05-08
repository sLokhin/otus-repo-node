const symbols = ['├', '│', '└'];
const space = '\u0020';
const newLine = '\u000A';

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

function buildTree(data) {
  const { name, items } = data;

  const root = String(name) ? `${name}${newLine}` : `Root${newLine}`;

  if (!hasChildItems(data)) return root;

  return root + buildBranch(items);
}

function buildBranch(items, prefix = '') {
  let branch = '';

  items.forEach((item, i) => {
    const isLastItem = i === items.length - 1;
    const nextSymbol = isLastItem ? symbols[2] : symbols[0];
    branch += prefix + nextSymbol + item.name + newLine;

    if (hasChildItems(item))
      branch += buildBranch(
        item.items,
        prefix + (isLastItem ? space : symbols[1])
      );
  });

  return branch;
}

function hasChildItems(item) {
  const { items } = item;
  return Array.isArray(items) && items.length > 0;
}

console.log('Build tree function');
console.log(buildTree(data));

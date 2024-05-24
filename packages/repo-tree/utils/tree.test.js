import { buildTree } from './tree.js';

const testData0 = {
  name: 'TestRoot0',
  items: [],
};

describe('Test buildTree() function', () => {
  it('test zero children tree', () => {
    expect(buildTree(testData0)).toBe('TestRoot0\n');
  });
});

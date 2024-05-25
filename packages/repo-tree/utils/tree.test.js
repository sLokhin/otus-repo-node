import { buildTree, buildBranch, hasChildItems } from './tree.js';

const testData0 = {
  name: '',
  items: [],
};

const testData1 = {
  name: 'TestRoot1',
  items: [],
};

const testData2 = {
  name: 'TestRoot2',
};

const testData3 = {
  name: 'TestRoot3',
  items: [{ name: 'item1' }, { name: 'item2' }],
};

describe('Test buildTree() function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('default root name', () => {
    const data = testData0;
    expect(buildTree(data)).toBe('Root\n');
  });

  it('zero children tree', () => {
    const data = testData1;
    expect(buildTree(data)).toBe('TestRoot1\n');
  });

  it('test data with no "items" property not throw error', () => {
    const data = testData2;
    expect(() => buildTree(data)).not.toThrow();
    expect(buildTree(data)).toBe('TestRoot2\n');
  });

  it('simple tree with two items', () => {
    const data = testData3;
    expect(buildTree(data)).toBe('TestRoot3\n├item1\n└item2\n');
  });
});

describe('Test buildBranch() function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('simple two items branch', () => {
    const data = testData3;
    expect(buildBranch(data.items)).toBe('├item1\n└item2\n');
  });

  it('non-array "items" throw error', () => {
    expect(() => buildBranch()).toThrow();
  });
});

describe('Test hasChildItems() function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('branch with child items returns "true"', () => {
    const branch = {
      name: 'branch0',
      items: [{ name: 3 }, { name: 4 }],
    };
    expect(hasChildItems(branch)).toBe(true);
  });

  it('branch with no child items returns "false"', () => {
    const branch = {
      name: 'branch0',
      items: [],
    };
    expect(hasChildItems(branch)).toBe(false);
  });

  it('branch with no "items" property not throw error', () => {
    const branch = {
      name: 'branch0',
    };
    expect(() => hasChildItems(branch)).not.toThrow();
    expect(hasChildItems(branch)).toBe(false);
  });

  it('branch with non-array "items" not throw error', () => {
    const branch = {
      name: 'branch0',
      items: 'item1 item2 item3',
    };
    expect(() => hasChildItems(branch)).not.toThrow();
    expect(hasChildItems(branch)).toBe(false);
  });
});

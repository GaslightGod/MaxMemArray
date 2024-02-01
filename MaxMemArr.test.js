const MaxMemArr = require('./MaxMemArr'); // Adjust the path based on your directory structure

describe('MaxMemArr', () => {
  let maxMemArray;

  beforeEach(() => {
    maxMemArray = new MaxMemArr(5);
  });

  test('push and slice', () => {
    maxMemArray.push('A');
    maxMemArray.push('B');
    maxMemArray.push('C');
    maxMemArray.push('D');
    maxMemArray.push('E');
    expect(maxMemArray.slice()).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('splice', () => {
    maxMemArray.push('A');
    maxMemArray.push('B');
    maxMemArray.push('C');
    maxMemArray.push('D');
    maxMemArray.push('E');
    const removedElements = maxMemArray.splice(1, 2, 'X', 'Y', 'Z');
    expect(maxMemArray.slice()).toEqual(['A', 'X', 'Y', 'Z', 'D']);
    expect(removedElements).toEqual(['B', 'C']);
  });
});
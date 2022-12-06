import { generateMapArray } from '../src/services/JSONtoMapArray.ts';

test('generateMapArray', () => {
    let text = '{"street1": {' +
            '"0": [ [0, 1], [0, 2], [54, 6] ],'+
            '"90": [ [42, 42], [41, 46] ],' +
            '"180": [ [0, 5], [3, 2] ],' +
            '"270": [ [54, 3], [42, 44] ]' +
        '},' +
        '"straight_road": {' +
            '"0": [ [4, 3] ],' +
            '"90": [ [7, 5] ],' +
            '"180": [ ],' +
            '"270": [ [50, 51] ] }}';

    const data = JSON.parse(text);
    const streetArray = generateMapArray(data);

    expect(streetArray).toHaveLength(100);
    expect(streetArray[0][0]).toMatch("");
    expect(streetArray[0][1]).toMatch("street1:0");
    expect(streetArray[54][3]).toMatch("street1:270");
    expect(streetArray[4][3]).toMatch("straight_road:0");
    expect(streetArray[7][5]).toMatch("straight_road:90");
  })
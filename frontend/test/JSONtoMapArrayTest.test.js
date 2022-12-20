import { generateMapArray } from "../src/services/JSONtoMapArray.ts";

test("generateMapArray", () => {
  let text =
    '[{"streetType":"road_straight",' +
    '"rotation":90,' +
    '"posX":1,' +
    '"posY":1' +
    "}," +
    '{"streetType":"road_straight",' +
    '"rotation":180,' +
    '"posX":1,' +
    '"posY":3}]';

  const data = JSON.parse(text);
  const streetArray = generateMapArray(data);

  expect(streetArray).toHaveLength(100);
  expect(streetArray[5][5]).toMatch("");
  expect(streetArray[0][0]).toMatch("road_straight:90");
  expect(streetArray[0][2]).toMatch("road_straight:180");
});

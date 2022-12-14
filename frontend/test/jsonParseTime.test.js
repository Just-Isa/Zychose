import { expect, test } from "vitest";
import { gridToJson, jsonToState } from "../src/services/JSONparser.ts";

let streetState = [];
for (let row = 1; row <= 100; row++) {
  for (let col = 1; col <= 100; col++) {
    const newStreet = {
      streetType: "straight-road",
      rotation: 90,
      posX: col,
      posY: row,
    };
    streetState.push(newStreet);
  }
}

test("gridstate parsing to json time elapsed", () => {
  const start = new Date().getTime();
  gridToJson(streetState);
  const elapsed = new Date().getTime() - start;
  const elapsedInSeconds = elapsed / 1000;
  console.log(console.log(`${elapsedInSeconds}s`));
  expect(elapsedInSeconds).toBeLessThan(0.01);
});

test("parsing from json to state time elapsed", () => {
  const start = new Date().getTime();
  jsonToState(JSON.stringify(streetState));
  const elapsed = new Date().getTime() - start;
  const elapsedInSeconds = elapsed / 1000;
  console.log(console.log(`${elapsedInSeconds}s`));
  expect(elapsedInSeconds).toBeLessThan(0.01);
});

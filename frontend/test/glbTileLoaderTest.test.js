import { useGLB } from "../src/services/glbBlockLoader.ts";

test.skip("useGLBSuccess", () => {
  const { generateTileMap } = useGLB();
  generateTileMap();

  const assetNames = import.meta.glob(`/assets/models/*`);
  let keys = new Array();
  for (const path in assetNames) {
    let key = path.toString().split("/")[4].split(".")[0];
    keys.push(key);
  }

  expect("grass").toBe(keys[0]);
});

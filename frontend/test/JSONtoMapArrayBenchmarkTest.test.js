import { useGLB } from "@/services/glbBlockLoader";
import { SceneManager } from "@/services/SceneManager";
import { Scene } from "three";

test("full JSON (benchmark)", async () => {
  let streetState = [];
  for (let row = 1; row <= 100; row++) {
    for (let col = 1; col <= 100; col++) {
      const newStreet = {
        streetType: "road_straight",
        rotation: 90,
        posX: col,
        posY: row,
      };
      streetState.push(newStreet);
    }
  }
  const { glbState, generateBlockMap } = useGLB();

  let startTime = performance.now();

  await generateBlockMap();
  const blockMap = glbState.blockMap;
  const scene = new Scene();
  const sceneManager = new SceneManager(scene, blockMap, streetState);
  await sceneManager.createLandscape();
  await sceneManager.createGrid();

  let endTime = performance.now();

  expect(endTime - startTime).toBeLessThan(100);
});

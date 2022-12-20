<template>
  <Renderer ref="renderer" resize="window" antialias>
    <PerspectiveCamera
      ref="perspectiveCamera"
      :position="{ y: 100, z: 100 }"
      :look-at="{ x: 0, y: 0, z: 0 }"
      :near="2"
      :far="2000"
    />
    <Scene ref="scene" background="#fff">
      <PointLight :position="{ y: 5000, z: 50 }" />
      <Box ref="box1" :scale="{ x: 3, y: 3, z: 3 }">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script lang="ts">
import {
  Box,
  LambertMaterial,
  PerspectiveCamera,
  PointLight,
  Renderer,
  Scene,
} from "troisjs";
import { useGLB } from "@/services/glbBlockLoader";
import { SceneManager } from "@/services/SceneManager";
import { useKeyInput } from "@/services/useKeyInput";

const { glbState, generateBlockMap } = useGLB();

generateBlockMap();

const { inputs } = useKeyInput();

export default {
  components: {
    Box,
    LambertMaterial,
    PointLight,
    Renderer,
    Scene,
    PerspectiveCamera,
  },
  mounted() {
    const blockMap = glbState.blockMap;
    const scene = (this.$refs.scene as any).scene;
    const renderer = (this.$refs.renderer as any).renderer;
    console.log(blockMap);
    const sceneManager = new SceneManager(scene, blockMap, renderer);
    console.log("AAAAA");
    sceneManager.createLandscape();
    sceneManager.createGrid();
    sceneManager.addCar();
    sceneManager.handleRender();
    inputs();
  },
};
</script>

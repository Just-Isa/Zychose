<template>
  <Renderer ref="renderer" resize="window" antialias>
    <PerspectiveCamera
      ref="cameraTop"
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
import { useInputs } from "@/services/useInputs";

const { glbState, generateBlockMap } = useGLB();

generateBlockMap();

const { inputs } = useInputs();

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
    const camera = (this.$refs.cameraTop as any).camera;

    const sceneManager = new SceneManager(scene, blockMap, renderer, camera);

    sceneManager.createLandscape();
    sceneManager.createGrid();
    sceneManager.addCar();
    sceneManager.handleRender();
    inputs();
  },
};
</script>

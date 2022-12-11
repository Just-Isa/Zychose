<template>
  <Renderer
    ref="renderer"
    resize="window"
    antialias
    :orbit-ctrl="{
      autoRotate: false,
      enableDamping: true,
      dampingFactor: 0.05,
    }"
  >
    <Camera
      ref="camera"
      :position="{ y: 1500, z: 400 }"
      :look-at="{ x: 0, y: 0, z: 0 }"
      :near="1"
      :far="5500"
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
  Camera,
  LambertMaterial,
  PointLight,
  Renderer,
  Scene,
} from "troisjs";
import { useGLB } from "@/services/glbBlockLoader";
import { SceneManager } from "@/services/SceneManager";

const { glbState, generateBlockMap } = useGLB();

generateBlockMap();

export default {
  components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene },
  mounted() {
    const blockMap = glbState.blockMap;
    const scene = (this.$refs.scene as any).scene;
    const sceneManager = new SceneManager(scene, blockMap);
    const camera = (this.$refs.camera as any).camera;

    camera.sceneManager.createLandscape();
    sceneManager.createGrid();
    sceneManager.handleCar();
  },
};
</script>

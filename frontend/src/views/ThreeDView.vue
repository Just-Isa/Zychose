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
    <PerspectiveCamera
      ref="cameraTop"
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
  PerspectiveCamera,
  PointLight,
  Renderer,
  Scene,
} from "troisjs";
import { useGLB } from "@/services/glbBlockLoader";
import { SceneManager } from "@/services/SceneManager";
import { CameraManager } from "@/services/CameraManager";
import { useCamera } from "@/services/CreateCamera";

const { glbState, generateBlockMap } = useGLB();
const { camState, createCamera } = useCamera();

generateBlockMap();
createCamera();

export default {
  components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, PerspectiveCamera },
  mounted() {
    
    const blockMap = glbState.blockMap;
    const scene = (this.$refs.scene as any).scene;
    const camera = (this.$refs.cameraTop as any).camera;
    camera.name = "CameraTop";
    const renderer = (this.$refs.renderer as any).renderer;
    const sceneManager = new SceneManager(scene, blockMap);
    const camMap = camState.cameraMap;
    const camaraManager = new CameraManager( scene, renderer, camera, camMap);
   
    sceneManager.createLandscape();
    sceneManager.createGrid();
    sceneManager.handleCar();
    camaraManager.switchCamera();
  },
};
</script>

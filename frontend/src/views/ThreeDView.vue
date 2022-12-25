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
      :position="{ y: 1500, z: 400 }"
      :look-at="{ x: 0, y: 0, z: 0 }"
      :near="1"
      :far="5500"
    />
    <Scene ref="scene" background="#fff">
      <PointLight :position="{ y: 5000, z: 50 }" />
    </Scene>
  </Renderer>
</template>

<script lang="ts">
import {
  Camera,
  LambertMaterial,
  PointLight,
  Renderer,
  Scene,
} from "troisjs";
import { useGLB } from "@/services/glbBlockLoader";
import * as THREE from "three";
import { SceneManager } from "@/services/SceneManager";
import data from "../data/dummy.json";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const { glbState, generateBlockMap } = useGLB();

generateBlockMap();
export default {
  components: {
    Camera,
    LambertMaterial,
    PointLight,
    Renderer,
    Scene,
  },
  mounted() {
    const blockMap = glbState.blockMap;
    const scene = (this.$refs.scene as typeof Scene).scene;
    const sceneManager = new SceneManager(scene, blockMap, data);

    new RGBELoader()
      .setPath("/src/assets/skybox/")
      .load("skylight.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;
      });

    sceneManager.createLandscape();
    sceneManager.createGrid();
  },
};
</script>

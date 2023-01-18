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
import { Camera, PointLight, Renderer, Scene } from "troisjs";
import { useGLB } from "@/services/glbBlockLoader";
import { SceneManager } from "@/views/threeD/SceneManager";
import data from "../../data/dummy.json";
import config from "../../../../swtp.config.json";
import { useVehicle } from "@/services/use3DVehicle";
import { useVehicleCommands } from "../../services/useVehicleCommands";
import { useKeyInput } from "./keyInputHandler";

const { glbState, loadModel } = useGLB();
const { publishVehicleCommands } = useVehicleCommands();
const { keysPressed, inputs } = useKeyInput();
const { receiveVehicle } = useVehicle();
const sendInterval = 100;

config.miscModels.forEach((element) => {
  glbState.blockMap.set(element.name, loadModel(element.glbPath));
});

config.streetTypes.forEach((element) => {
  if (element.glbPath) {
    glbState.blockMap.set(element.name, loadModel(element.glbPath));
  }
});

config.allVehicleTypes.forEach((element) => {
  if (element.glbPath) {
    glbState.blockMap.set(element.name, loadModel(element.glbPath));
  }
});

export default {
  components: {
    Camera,
    PointLight,
    Renderer,
    Scene,
  },
  mounted() {
    receiveVehicle();
    const blockMap = glbState.blockMap;
    const scene = (this.$refs.scene as typeof Scene).scene;
    const renderer = (this.$refs.renderer as any).renderer;
    const sceneManager = new SceneManager(
      scene,
      blockMap,
      data as any,
      renderer
    );
    sceneManager.initScene();
    inputs();
    //sends VehicleCommands to backend in a set interval
    setInterval(function () {
      publishVehicleCommands(Array.from(keysPressed.directions));
    }, sendInterval);
  },
};
</script>

import type { Scene } from "three";
import type * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { reactive } from "vue";



const gltfloader = new GLTFLoader();
const PATH = "/src/assets/models/";
const glbState = reactive<GLBState>({
    tileMap: new Map()
})

export function useGLB(){
    return {glbState, generateTileMap}
}

export interface GLBState{
    tileMap : Map<string, Promise<THREE.Group>>
}

//creates an map of tiles with tile name as key and Promise as Value.
function generateTileMap(){
    //path cant be variable, i dont know why 
    const assetNames = import.meta.glob(`/src/assets/models/*`)

    for(const path in assetNames){
        let key = path.toString().split("/")[4].split(".")[0];
        glbState.tileMap.set(key, modelLoader(key))
    }
    console.log(glbState.tileMap)
}

//loads the tile assets from filepath
//returns an Promise
async function modelLoader(filename: string): Promise<THREE.Group>{
    const url = `${PATH}${filename}.glb`
    return new Promise((resolve, reject) => {
        try {
        gltfloader.load(url, data => resolve(data.scene),
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        reject);
        } catch (error) {
            
        }
        
    });
}


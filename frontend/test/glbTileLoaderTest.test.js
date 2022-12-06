import { useGLB } from '../src/services/glbTileLoader.ts';

test.skip('useGLB', () => {
    const { glbState, generateTileMap } = useGLB()
    generateTileMap()

    const assetNames =
        import.meta.glob(`/src/assets/models/*`)

    const tileMap = glbState.tileMap;

    let keys = new Array()
    for (const path in assetNames) {
        let key = path.toString().split("/")[4].split(".")[0];
        keys.push(key);
    }


    for (let [key, value] of tileMap) {
        console.log(key + " = " + value);
    }
    expect("grass").toBe(keys[0]);


})
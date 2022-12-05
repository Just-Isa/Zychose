import {
  TypeStreet,
  type IStreetInformation,
} from "../components/grid/useStreets";

export function gridToJson(streets: IStreetInformation[]) {
  const streettypeAsKeyMap = new Map();

  const keys = Object.keys(TypeStreet).filter((v) => !isNaN(Number(v)));
  const rotations = [0, 90, 180, 270];

  for (const k of keys) {
    const filteredStreets = streets.filter(
      (element) => element.streettype === Number(k)
    );

    console.log(
      `FILTERED STREETS: ${filteredStreets.forEach((ele) =>
        console.log(ele.streettype, ele.rotation, ele.posX, ele.posY)
      )}`
    );

    const rotationAsKeyMap = new Map();

    for (const r of rotations) {
      const filteredRotations = filteredStreets.filter(
        (element) => element.rotation === Number(r)
      );
      const positionArray = [];

      for (const ele of filteredRotations) {
        positionArray.push([ele.posX, ele.posY]);
      }

      rotationAsKeyMap.set(r, positionArray);
    }
    streettypeAsKeyMap.set(k, rotationAsKeyMap);
  }

  console.log(streettypeAsKeyMap);
  const dings = JSON.stringify(
    Array.from(Array.from(streettypeAsKeyMap.entries()).entries())
  );
  const dings2 = JSON.stringify(streettypeAsKeyMap.keys);
  console.log(dings);
  console.log(dings2);
}

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
    const name = TypeStreet[Number(k)];
    streettypeAsKeyMap.set(name, rotationAsKeyMap);
  }

  console.log(streettypeAsKeyMap);
  const dings = JSON.stringify(
    Array.from(Array.from(streettypeAsKeyMap.entries()).entries())
  );
  const dings2 = JSON.stringify(streettypeAsKeyMap.keys);
  console.log(dings);
  console.log(dings2);
  console.log("mein Teil: ");
  console.log("------------------------------------------");
  console.log(JSON.stringify(streettypeAsKeyMap));
  const jsonObject = Object.fromEntries(streettypeAsKeyMap);
  console.log("jsonObject vorher: ", jsonObject);
  console.log("JSON.stringify: ", JSON.stringify(jsonObject));
  for (const k of keys) {
    const n = TypeStreet[Number(k)];
    console.log("k: ", n);
    console.log("Eintrag: ", Object.fromEntries(streettypeAsKeyMap.get(n)));
    jsonObject[n] = Object.fromEntries(streettypeAsKeyMap.get(n));
  }
  console.log("jsonObject nachher: ", jsonObject);
  const jsonString = JSON.stringify(jsonObject);
  console.log("jsonObject.stringify: ", jsonString);
  const againJSONObject = JSON.parse(jsonString);
  console.log("parse: ", againJSONObject);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++");
  for (const k of keys) {
    const n = TypeStreet[Number(k)];
    console.log("k: ", n);
    const neueMap = new Map(Object.entries(againJSONObject[n]));
    console.log("Eintrag: ", neueMap);
    againJSONObject[n] = neueMap;
  }
  const mapAgain = new Map(Object.entries(againJSONObject));
  console.log(mapAgain);
}

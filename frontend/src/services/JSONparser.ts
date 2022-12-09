import {
  Rotations,
  TypeStreet,
  type IStreetInformation,
} from "../components/grid/useStreets";
import { useRoom } from "./useRoom";
export function gridToJson(streets: IStreetInformation[]) {
  const { updateRoomMap } = useRoom();
  const streettypeAsKeyMap = new Map();
  const keys = Object.keys(TypeStreet).filter(
    (key) => !isNaN(Number(key)) && key !== "0"
  );
  const rotations = Object.keys(Rotations)
    .filter((rotation) => !isNaN(Number(rotation)))
    .map((element) => Number(element));
  for (const key of keys) {
    const filteredStreets = streets.filter(
      (element) => element.streettype === Number(key)
    );
    const rotationAsKeyMap = new Map();
    for (const rotation of rotations) {
      const filteredRotations = filteredStreets.filter(
        (element) => element.rotation === Number(rotation)
      );
      const positionArray:Array<[Number,Number]> = [];
      for (const ele of filteredRotations) {
        positionArray.push([ele.posX, ele.posY]);
      }
      rotationAsKeyMap.set(rotation, positionArray);
    }
    const typeStreet = TypeStreet[Number(key)];
    streettypeAsKeyMap.set(typeStreet, rotationAsKeyMap);
  }
  const jsonObject = Object.fromEntries(streettypeAsKeyMap);
  for (const key of keys) {
    const typeStreet = TypeStreet[Number(key)];
    jsonObject[typeStreet] = Object.fromEntries(
      streettypeAsKeyMap.get(typeStreet)
    );
  }
  updateRoomMap(JSON.stringify(jsonObject));
  /*
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
  console.log(mapAgain);*/
}

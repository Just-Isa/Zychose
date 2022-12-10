import {
  Rotations,
  TypeStreet,
  type IStreetInformation,
} from "../components/grid/useStreets";
import { useRoom } from "./useRoom";
import { useStreets } from "../components/grid/useStreets";

export function gridToJson(streets: IStreetInformation[]) {
  const { updateRoomMap } = useRoom();
  const streetTypeAsKeyMap = new Map();
  const streetTypes = Object.keys(TypeStreet).filter(
    (type) => !isNaN(Number(type)) && type !== "0"
  );
  const rotations = Object.keys(Rotations)
    .filter((rotation) => !isNaN(Number(rotation)))
    .map((element) => Number(element));

  for (const type of streetTypes) {
    const filteredStreets = streets.filter(
      (element) => element.streetType === Number(type)
    );
    const rotationAsKeyMap = new Map();
    for (const rotation of rotations) {
      const filteredRotations = filteredStreets.filter(
        (element) => element.rotation === Number(rotation)
      );

      const positionArray: Array<[Number, Number]> = [];
      for (const ele of filteredRotations) {
        positionArray.push([ele.posX, ele.posY]);
      }
      rotationAsKeyMap.set(rotation, positionArray);
    }
    const typeStreet = TypeStreet[Number(type)];
    streetTypeAsKeyMap.set(typeStreet, rotationAsKeyMap);
  }
  const jsonObject = Object.fromEntries(streetTypeAsKeyMap);
  for (const type of streetTypes) {
    const typeStreet = TypeStreet[Number(type)];
    jsonObject[typeStreet] = Object.fromEntries(
      streetTypeAsKeyMap.get(typeStreet)
    );
  }
  updateRoomMap(JSON.stringify(jsonObject));
  jsonToState(JSON.stringify(jsonObject));
}

function jsonToState(roomMapAsString: string) {
  const { recieveNewStreetState } = useStreets();
  const newStreetsState: Array<IStreetInformation> = [];
  const roomMap = roomMapAsString;
  const roomMapAsObject = JSON.parse(roomMap);
  console.log("parse: ", roomMapAsObject);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++");

  for (const [type, rotations] of Object.entries(roomMapAsObject)) {
    for (const [rotation, positions] of Object.entries(Object(rotations))) {
      const positionArray: Array<[][]> = positions as Array<[][]>;
      for (const coordinate of positionArray) {
        const streetObject: IStreetInformation = {
          rotation: Number(rotation),
          posX: Number(coordinate[0]),
          posY: Number(coordinate[1]),
          streetType: TypeStreet[type as keyof typeof TypeStreet],
        };
        console.log("object:", streetObject);
        newStreetsState.push(streetObject);
      }
    }
  }
  recieveNewStreetState(newStreetsState);
}

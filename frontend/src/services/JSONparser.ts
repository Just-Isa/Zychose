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

  /*jsonToState wird am Ende nicht an dieser Stelle aufgerufen,
    das Linting weint aber sonst wegen unused function rum und zum testen hat es hier gereicht.
    Der Aufruf erfolgt dann nach einer Nachricht vom Backend.
  */
  jsonToState(JSON.stringify(jsonObject));
}

/**
   * Function to parse a stringified JSON RoomMap in our state format.
   * This function is necessary to be able to synchronize the RoomMap for all users in a room.
   * @param {string} roomMapAsString - stringified JSON-Object of our streets
   */
function jsonToState(roomMapAsString: string) {
  const { recieveNewStreetState } = useStreets();
  const newStreetsState: Array<IStreetInformation> = [];
  const roomMap = roomMapAsString;
  const roomMapAsObject = JSON.parse(roomMap);
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
        newStreetsState.push(streetObject);
      }
    }
  }
  recieveNewStreetState(newStreetsState);
}

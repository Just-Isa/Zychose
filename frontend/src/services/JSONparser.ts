import type { IStreetInformation } from "./useStreets";
import { useRoom } from "./useRoom";
import { useStreets } from "./useStreets";

/**
 * Function to parse the streetState into a JSON format
 * @param {IStreetInformation[]} streets array of all streets in form of our generated streetState
 */
export function gridToJson(streets: IStreetInformation[]) {
  const { updateRoomMap } = useRoom();
  updateRoomMap(JSON.stringify(streets));
}

/* eslint-disable @typescript-eslint/no-unused-vars*/
/**
 * Function to parse a stringified JSON RoomMap in our state format.
 * This function is necessary to be able to synchronize the RoomMap for all users in a room.
 * @param {string} roomMapAsString - stringified JSON-Object of our streets
 */
export function jsonToState(roomMapAsString: string) {
  const { recieveNewStreetState } = useStreets();
  const newState = JSON.parse(roomMapAsString);
  recieveNewStreetState(newState);
}
/* eslint-enable */

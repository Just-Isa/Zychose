import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { useRoomBox } from "./useRoomList";
import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";
import { Room, type IRoom } from "../model/IRoom";
import { logger } from "@/helpers/Logger";

const webSocketUrl = `ws://${window.location.host}/stompbroker`;

export interface IRoomState {
  room: IRoom;
  errorMessage: string;
}

const roomState = reactive<IRoomState>({
  room: new Room("", 1, [], "", ""),
  errorMessage: "",
});

/**
 * @returns Export of useRoom
 */
export function useRoom() {
  return {
    roomState: readonly(roomState),
    receiveRoom,
    swapRooms,
    updateRoom,
    removeUserFromRoom,
    updateRoomMap,
  };
}

//function to save the roomMap for a Room
/* eslint-disable @typescript-eslint/no-unused-vars*/
function updateRoomMap(rMap: string): void {
  roomState.room.roomMap = rMap;
  updateRoom(roomState.room.roomNumber);
}
/* eslint-enable */

const { getRoomList } = useRoomBox();
/**
 * Subscribes to the specific Rooms topic
 *
 */
function receiveRoom() {
  const receiveRoomStompClient = new Client({ brokerURL: webSocketUrl });
  const DEST = "/topic/room/" + roomState.room.roomNumber;

  receiveRoomStompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  receiveRoomStompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  receiveRoomStompClient.onConnect = () => {
    receiveRoomStompClient.subscribe(DEST, (message) => {
      roomState.room = JSON.parse(message.body);
    });
  };
  receiveRoomStompClient.activate();
}

/** Publishes Room to the rooms specific topic
 *
 * @param operator Operation type
 * @param roomNumber Roomnumber
 */
function updateRoom(roomNumber: number) {
  const updateRoomStompClient = new Client({ brokerURL: webSocketUrl });
  const DEST = "/topic/room/" + roomNumber;
  updateRoomStompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  updateRoomStompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  updateRoomStompClient.onConnect = () => {
    try {
      updateRoomStompClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(roomState.room),
      });
    } catch (err) {
      logger.log("Error while publishing room! ", err);
    }
  };
  updateRoomStompClient.activate();
}

/** Changes Room a User is in to another
 *
 * @param roomNumber Room number into which the user is to be swapped
 */
function swapRooms(roomNumber: number) {
  const DEST = "/api/room/" + roomNumber;
  fetch(DEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: getSessionIDFromCookie() }),
  })
    .then((response) => {
      if (!response.ok) {
        location.href = "/500";
      } else {
        return response.text();
      }
    })
    .then(() => {
      roomState.room.roomNumber = roomNumber;
      updateRoom(roomNumber);
      getRoomList();
    })
    .catch(() => {
      location.href = "/500";
    });
}

/**
 *  Removes a user from a room
 */
function removeUserFromRoom() {
  const DEST = "/api/user/logout";
  fetch(DEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: getSessionIDFromCookie() }),
  })
    .then((response) => {
      if (!response.ok) {
        location.href = "/500";
      } else {
        return response.text();
      }
    })
    .then(() => {
      roomState.room.roomNumber = 0;
      getRoomList();
    })
    .catch(() => {
      location.href = "/500";
    });
}

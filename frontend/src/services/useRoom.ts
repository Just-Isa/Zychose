import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Room, type IRoom } from "./IRoom";
import { useRoomBox } from "./useRoomList";
import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";

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
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/room/" + roomState.room.roomNumber;
  const stompClient = new Client({ brokerURL: webSocketUrl });
  stompClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  stompClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      roomState.room = JSON.parse(message.body);
    });
  };
  stompClient.activate();
  stompClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}

/** Publishes Room to the rooms specific topic
 *
 * @param operator Operation type
 * @param user User that is to be published
 */
function updateRoom(roomNumber: number) {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/room/" + roomNumber;
  const roomClient = new Client({ brokerURL: webSocketUrl });
  roomClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  roomClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  roomClient.onConnect = () => {
    try {
      roomClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(roomState.room),
      });
    } catch (err) {
      // in case of an error
      console.log("Error while Publishing User! ", err);
    }
  };
  roomClient.activate();
  roomClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
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

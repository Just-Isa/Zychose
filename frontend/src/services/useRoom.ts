import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Room, type IRoom } from "./IRoom";
import { useRoomBox } from "./useRoomList";
import { MessageOperator } from "./MessageOperators";
import { getSessionIDFromCookie } from "@/helpers/SessionIDHelper";

const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const receiveRoomstompClient = new Client({ brokerURL: webSocketUrl });
const upsateRoomStompClient = new Client({ brokerURL: webSocketUrl });

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
}
/* eslint-enable */

const { getRoomList } = useRoomBox();
/**
 * Subscribes to the specific Rooms topic
 *
 */
function receiveRoom() {
  const DEST = "/topic/room/" + roomState.room.roomNumber;
  receiveRoomstompClient.activate();
  receiveRoomstompClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  receiveRoomstompClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  receiveRoomstompClient.onConnect = () => {
    receiveRoomstompClient.subscribe(DEST, (message) => {
      roomState.room = JSON.parse(message.body);
      console.log(roomState.room);
    });
  };
}

/** Publishes Room to the rooms specific topic
 *
 * @param operator Operation type
 * @param user User that is to be published
 */
function updateRoom(operator: MessageOperator, roomNumber: number) {
  const DEST = "/topic/room/" + roomNumber;

  if (!upsateRoomStompClient.connected) {
    upsateRoomStompClient.activate();
  }
  upsateRoomStompClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  upsateRoomStompClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  try {
    upsateRoomStompClient.publish({
      destination: DEST,
      headers: {},
      body: JSON.stringify(operator),
    });
  } catch (err) {
    // in case of an error
    console.log("Error while Publishing User! ", err);
  }
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
      updateRoom(MessageOperator.UPDATE, roomNumber);
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

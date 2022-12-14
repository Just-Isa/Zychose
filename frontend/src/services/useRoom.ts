import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Room, type IRoom } from "./IRoom";
import { useRoomBox } from "./useRoomList";

export interface IRoomState {
  room: IRoom;
  errorMessage: string;
}

const roomState = reactive<IRoomState>({
  room: new Room("", 1, []),
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
    removeUserFromRoom,
  };
}

const { getRoomList } = useRoomBox();

/**
 * Subscribes to the specific Rooms topic
 *
 * NOT IMPLEMENTED / NO FUNCTIONALITY
 */
function receiveRoom() {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/room";
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

/** Changes room of a user is in to another
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
    body: JSON.stringify({ sessionId: document.cookie.split("=")[1] }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Fehler bei Raumänderung!");
      } else {
        return response.text();
      }
    })
    .then(() => {
      console.log("Done! New Room: " + roomNumber);
      roomState.room.roomNumber = roomNumber;
      getRoomList();
    })
    .catch((e) => {
      console.log("Fehler bei Raumänderung! " + e);
    });
}

/**
 *  Removes a user from a room
 */
function removeUserFromRoom() {
  const DEST = "/api/room/remove";
  fetch(DEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: document.cookie.split("=")[1] }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Fehler beim Raum verlassen!");
      } else {
        return response.text();
      }
    })
    .then(() => {
      roomState.room.roomNumber = 0;
      getRoomList();
    })
    .catch((e) => {
      console.log("Fehler beim Raum verlassen!" + e);
    });
}

import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Room, type IRoom } from "./IRoom";
import { useRoomBox } from "./useRoomList";
import { MessageOperator } from "./MessageOperators";
export interface IRoomState {
  room: IRoom;
  errorMessage: string;
}

const roomState = reactive<IRoomState>({
  room: new Room("", 1, [], new File([], "")),
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
  };
}

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
      console.log(roomState.room.userList);
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
function updateRoom(operator: MessageOperator, roomNumber: number) {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/room/" + roomNumber;
  const roomClient = new Client({ brokerURL: webSocketUrl });
  roomClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  roomClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  roomClient.onConnect = (frame) => {
    console.log("connected", frame);
    try {
      roomClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(operator),
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
      roomState.room.roomNumber = roomNumber;
      updateRoom(MessageOperator.UPDATE, roomNumber);
      getRoomList();
    })
    .catch((e) => {
      console.log("Fehler bei Raumänderung! " + e);
    });
}

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
  return { roomState: readonly(roomState), receiveRoom, swapRooms};
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

/** Changes Room a User is in to another
 * 
 * @param roomNumber Room number into which the user is to be swapped
 */
function swapRooms(roomNumber : number) {
  console.log(roomNumber);
  const DEST = "/api/room/" + roomNumber;
  console.log(DEST);
  fetch(DEST, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({sessionId: document.cookie.split("=")[1]})
      })
      .then((response) => {
          if (!response.ok) {
              console.log("Fehler bei Raumänderung!")
          }else {
              return response.text();
          }
      })
      .then((response: string|undefined) => {
          console.log("Done! New Room: " + roomNumber);
          roomState.room.roomNumber = roomNumber;
          getRoomList();
      })
      .catch((e) => {
          console.log("Fehler bei Raumänderung! " + e)
      });
}

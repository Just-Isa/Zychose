import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Room, type IRoom } from "./IRoom";

export interface IRoomState {
  room: IRoom;
  errorMessage: string;
}

const roomState = reactive<IRoomState>({
  room: new Room("", 1, []),
  errorMessage: "",
});

//function to get access to the room and the functions with stomp
export function useRoom() {
  return { roomState: readonly(roomState), receiveRoom, swapRooms};
}

//function for receiving a room.
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

function swapRooms(roomNumber : number) {
  fetch('/api/room/'+roomNumber, {
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
      })
      .catch((e) => {
          console.log("Fehler bei Raumänderung! " + e)
      });
}

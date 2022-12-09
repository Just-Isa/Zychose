import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Room, type IRoom } from "./IRoom";

export interface IRoomState {
  room: IRoom;
  errorMessage: string;
}

const roomState = reactive<IRoomState>({
  room: new Room("", 1, [], ""),
  errorMessage: "",
});

//function to get access to the room and the functions with stomp
export function useRoom() {
  return { roomState: readonly(roomState), receiveRoom, updateRoomMap };
}
//function to save the roomMap for a Room
function updateRoomMap(rMap:String):void{
  roomState.room.roomMap = rMap;
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
      console.log("room-number: " + roomState.room.roomNumber);
    });
  };
  stompClient.activate();
  stompClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}

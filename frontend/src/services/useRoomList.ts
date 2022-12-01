import { reactive, readonly } from "vue";
import type { IRoom } from "./IRoom";
import { RoomList, type IRoomList } from "./IRoomList";

export interface IRoomListState {
    rooms: IRoomList
    errorMessage: string;
  }
  
const roomListState = reactive<IRoomListState>({
    rooms: new RoomList([]),
    errorMessage: ""
  });

export function getRoomList() : void {
    fetch('/api/roomlist', {
        method: 'GET'
    })
    .then((response) => {
        if (!response.ok) {
            roomListState.errorMessage = "Could not GET RoomBoxSingleton!" + response.status;
        }
        return response.json();
    })
    .then((jsondata) => {
        roomListState.rooms.roomList = jsondata;
        roomListState.errorMessage = "";
    })
    .catch((e) => {
        roomListState.errorMessage = e;
    });
}

export function useRoomBox() {
    return { roomListState: readonly(roomListState), getRoomList };
  }
  
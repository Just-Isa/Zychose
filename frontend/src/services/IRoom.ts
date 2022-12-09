import type { IUser } from "./IUser";

export interface IRoom {
  roomName: String;
  roomNumber: number;
  userList: IUser[];
  roomMap: String;
}

export class Room implements IRoom {
  roomName: String;
  roomNumber: number;
  userList: IUser[];
  roomMap: String;

  constructor(roomName: string, roomNumber: number, userList: IUser[], roomMap: String) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = userList;
    this.roomMap = roomMap;
  }
}

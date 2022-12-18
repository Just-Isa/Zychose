import type { IUser } from "./IUser";

export interface IRoom {
  roomName: String;
  roomNumber: number;
  userList: IUser[];
  jythonFile: File;
}

export class Room implements IRoom {
  roomName: String;
  roomNumber: number;
  userList: IUser[];
  jythonFile: File;

  constructor(roomName: string, roomNumber: number, userList: IUser[], jytohnFile: File) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = userList;
    this.jythonFile = jytohnFile;
  }
}

import type { IUser } from "./IUser";

export interface IRoom {
  roomName: string;
  roomNumber: number;
  userList: IUser[];
  jythonScript: string;
}

export class Room implements IRoom {
  roomName: string;
  roomNumber: number;
  userList: IUser[];
  jythonScript: string;

  constructor(
    roomName: string,
    roomNumber: number,
    userList: IUser[],
    jythonScript: string
  ) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = userList;
    this.jythonScript = jythonScript;
  }
}

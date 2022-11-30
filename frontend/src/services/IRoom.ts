import type { IUser } from "./IUser";

export interface IRoom {
  roomName: String;
  roomNumber: number;
  userList: IUser[];
}

export class Room implements IRoom {
  roomName: String;
  roomNumber: number;
  userList: IUser[];

  constructor(roomName: string, roomNumber: number, userList: IUser[]) {
    this.roomName = roomName;
    this.roomNumber = roomNumber;
    this.userList = userList;
  }
}

export interface IUser {
  sessionID: string;
  currentRoomNumber: number;
  userName: string;
}

export class User implements IUser {
  sessionID: string;
  currentRoomNumber: number;
  userName: string;

  constructor(sessionID: string, currentRoomNumber: number, userName: string) {
    this.userName = userName;
    this.sessionID = sessionID;
    this.currentRoomNumber = currentRoomNumber;
  }
}

export interface IUser {
  sessionID: string;
  currentRoomNumber: number;
  userName: string;
  loginTime: Date;
}

export class User implements IUser {
  sessionID: string;
  currentRoomNumber: number;
  userName: string;
  loginTime: Date;

  constructor(
    sessionID: string,
    currentRoomNumber: number,
    userName: string,
    loginTime: Date
  ) {
    this.userName = userName;
    this.sessionID = sessionID;
    this.currentRoomNumber = currentRoomNumber;
    this.loginTime = loginTime;
  }
}

export interface IUser {
  sessionID: string;
  currentRoomNumber: number;
  userName: string;
  loginTime: Date;
  minutesPlayed: number;
}

export class User implements IUser {
  sessionID: string;
  currentRoomNumber: number;
  userName: string;
  loginTime: Date;
  minutesPlayed: number;

  constructor(
    sessionID: string,
    currentRoomNumber: number,
    userName: string,
    loginTime: Date,
    minutesPlayed: number
  ) {
    this.userName = userName;
    this.sessionID = sessionID;
    this.currentRoomNumber = currentRoomNumber;
    this.loginTime = loginTime;
    this.minutesPlayed = minutesPlayed;
  }
}

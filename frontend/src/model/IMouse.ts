export interface IMouse {
  sessionID: string;
  roomNumber: number;
  x: number;
  y: number;
}

export class Mouse implements IMouse {
  sessionID: string;
  roomNumber: number;
  x: number;
  y: number;

  constructor(sessionID: string, roomNumber: number, x: number, y: number) {
    this.sessionID = sessionID;
    this.roomNumber = roomNumber;
    this.x = x;
    this.y = y;
  }
}

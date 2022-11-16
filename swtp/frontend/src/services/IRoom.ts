import type { IUser } from "./IUser";

export interface IRoom{
    roomname: String,
    roomnumber: number,
    userlist : IUser[]
}

export class Room implements IRoom{
    roomname: String;
    roomnumber: number;
    userlist : IUser[];
    
    constructor(roomname: string, roomnumber: number, userlist:IUser[]){
        this.roomname = roomname;
        this.roomnumber = roomnumber;
        this.userlist = userlist;
    }
}
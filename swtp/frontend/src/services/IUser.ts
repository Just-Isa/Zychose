
export interface IUser{
    username: string,
    sessionid: string,
    roomnr: number,

}

export class user implements IUser{
    username: string;
    sessionid: string;
    roomnr: number;
    
    constructor(username: string, sessionid: string, roomnr:number){
        this.username = username;
        this.sessionid = sessionid;
        this.roomnr = roomnr;
    }

}
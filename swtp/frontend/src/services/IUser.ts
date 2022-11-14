
export interface IUser{
    username: string,
    sessionid: string,
    roomnr: number,

}

export class user implements IUser{
    username = "";
    sessionid = "";
    roomnr = -1;
    
    constructor(username: string, sessionid: string, roomnr:number){
        this.username = username;
        this.sessionid = sessionid;
        roomnr = roomnr;
    }

}
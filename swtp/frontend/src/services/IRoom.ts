import type { IUser } from "./IUser";

export interface IRoom{
    roomname: String,
    roomnumber: number,
    userlist : IUser[]
}
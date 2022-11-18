import { reactive, readonly, resolveComponent } from "vue";
import { Room, type IRoom } from "./IRoom";
import { Client } from "@stomp/stompjs";


export interface IRoomState{
    room : IRoom,
    errormessage: string
}

const roomstate = reactive<IRoomState>({
    room: new Room("", 1, []),
    errormessage:""
});

//function to get access to the room and the functions with stomp
export function useRoom(){
    return {room:readonly(roomstate), receiveRoom}
}

//function for receiving a room.
function receiveRoom(){
    const wsurl =`ws://${window.location.host}/stompbroker`;
    const DEST = "/topic/room";
    const stompclient = new Client({brokerURL:wsurl})
    stompclient.onWebSocketError = (event) => { console.log("WS-error")/* WS-Error */ } 
    stompclient.onStompError = (frame) => { console.log("STOMP-error")/* STOMP-Error */ }
    stompclient.onConnect = (frame)=> {
        
        stompclient.subscribe(DEST, (message) =>{
            roomstate.room = JSON.parse(message.body);
            console.log("room: "+roomstate.room)
        });
    }
    stompclient.activate();
    stompclient.onDisconnect = () => { /* Verbindung abgebaut*/ }
}



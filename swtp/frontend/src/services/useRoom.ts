import { reactive, readonly, resolveComponent } from "vue";
import { Room, type IRoom } from "./IRoom";
import { Client } from "@stomp/stompjs";


export interface IRoomState{
    room : IRoom,
    errormessage: string
}

const roomstate = reactive<IRoomState>({
    room: new Room("", 0, []),
    errormessage:""
});

export function useRoom(){
    return {room:readonly(roomstate), receiveRoom}
}

function receiveRoom(){
    const wsurl =`ws://${window.location.host}/stompbroker`;
    const DEST = "/topic/room";
    const stompclient = new Client({brokerURL:wsurl})
    stompclient.onWebSocketError = (event) => { console.log("WS-error")/* WS-Error */ } 
    stompclient.onStompError = (frame) => { console.log("STOMP-error")/* STOMP-Error */ }
    stompclient.onConnect = (frame)=> {
        
        console.log("connected", frame);
        stompclient.subscribe(DEST, (message) =>{
            console.log("stomp client subscribe");
            roomstate.room = JSON.parse(message.body);
            console.log("room"+roomstate.room)
        });
    }
    stompclient.activate();
    stompclient.onDisconnect = () => { /* Verbindung abgebaut*/ }
    
}

function mouseMovement(){

}



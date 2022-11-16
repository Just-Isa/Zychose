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
    return {room:readonly(roomstate), updateRoom, receiveRoom}
}

function updateRoom(){
    const url = 'api/room';

    fetch(url).then(resp =>{
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    }).then((jsondata:IRoom)=>{
        roomstate.room = jsondata;
    }).catch(fehler =>{
        roomstate.errormessage="Raum konnten nicht geladen werden";
    });
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

            console.log(message.body);

            message = JSON.parse(message.body);
            console.log(message)
        });
    }
    stompclient.activate();
    stompclient.onDisconnect = () => { /* Verbindung abgebaut*/ }
    try {
        stompclient.publish({ destination: DEST, headers: {},
        body: "Bongo"
        // ... oder body: "irgendein String"
        });
    } catch (fehler) {
        // Problem beim Senden
        console.log("Es gab ein fehler", fehler);
    }
}




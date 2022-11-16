import { Client } from "@stomp/stompjs";
import type { IUser } from "./IUser";


export function useUser(){
    return {sendUser}
}

function sendUser(user:IUser){
    const wsurl =`ws://${window.location.host}/stompbroker`;
    const DEST = "/topic/user";
    const stompclient = new Client({brokerURL:wsurl})
    stompclient.onWebSocketError = (event) => { console.log("WS-error")/* WS-Error */ } 
    stompclient.onStompError = (frame) => { console.log("STOMP-error")/* STOMP-Error */ }
    stompclient.onConnect = (frame)=> {
        
        console.log("connected", frame);
        console.log(user)
        try {
            stompclient.publish({ 
                destination: DEST,
                headers:{},
                body:JSON.stringify(user)
            });
        } catch (fehler) {
            // Problem beim Senden
            console.log("Es gab ein fehler", fehler);
        }
    }
    stompclient.activate();
    stompclient.onDisconnect = () => { /* Verbindung abgebaut*/ }
}
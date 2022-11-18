import { Client } from "@stomp/stompjs";
import type { IUser } from "./IUser";


//zugreifbar gemacht
export function useUser(){
    return {sendUser}
}


//um einen User zum Server zu schicken.
function sendUser(user:IUser){
    const wsurl =`ws://${window.location.host}/stompbroker`;
    const DEST = "/topic/user";
    const userClient = new Client({brokerURL:wsurl})
    userClient.onWebSocketError = (event) => { console.log("WS-error")/* WS-Error */ } 
    userClient.onStompError = (frame) => { console.log("STOMP-error")/* STOMP-Error */ }
    userClient.onConnect = (frame)=> {
        
        console.log("connected", frame);
        try {
            userClient.publish({ 
                destination: DEST,
                headers:{},
                body:JSON.stringify(user)
            });
        } catch (fehler) {
            // Problem beim Senden
            console.log("Es gab ein fehler", fehler);
        }
    }
    userClient.activate();
    userClient.onDisconnect = () => { /* Verbindung abgebaut*/ }
}
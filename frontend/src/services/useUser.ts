import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Mouse, type IMouse } from "./IMouse";
import type { IUser } from "./IUser";
import type { MessageOperator } from "./MessageOperators";

export interface IMouseState {
  mouse: IMouse;
  errormessage: string;
}

const mouseState = reactive<IMouseState>({
  mouse: new Mouse("", 0, 0, 0),
  errormessage: "",
});

interface UserDTO {
  operator: MessageOperator;
  user: IUser;
}

//zugreifbar gemacht
export function useUser() {
  return {
    publishUser,
    publishMouse,
    receiveMouse,
    mouseState: readonly(mouseState),
  };
}

//um einen User zum Server zu schicken.
function publishUser(operator: MessageOperator, user: IUser) {
  const userDto: UserDTO = {
    operator: operator,
    user: user,
  };

  const wsurl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/user";
  const userClient = new Client({ brokerURL: wsurl });
  userClient.onWebSocketError = (event) => {
    console.log("WS-error"); /* WS-Error */
  };
  userClient.onStompError = (frame) => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  userClient.onConnect = (frame) => {
    console.log("connected", frame);
    try {
      userClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(userDto),
      });
    } catch (fehler) {
      // in case of an error
      console.log("Es gab ein fehler", fehler);
    }
  };
  userClient.activate();
  userClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}
//function sends Mouse to a server.
function publishMouse(mouse: IMouse) {
  const wsurl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/mouse";
  const userClient = new Client({ brokerURL: wsurl });
  userClient.onWebSocketError = (event) => {
    console.log("WS-error-mouse"); /* WS-Error */
  };
  userClient.onStompError = (frame) => {
    console.log("STOMP-error-mouse"); /* STOMP-Error */
  };
  userClient.onConnect = (frame) => {
    try {
      userClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(mouse),
      });
    } catch (fehler) {
      // In case of an error
      console.log("Es gab ein fehler", fehler);
    }
  };
  userClient.activate();
  userClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}
//function to receive a mouse, so movement can be available to others.
function receiveMouse() {
  const wsurl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/mouse";
  const stompclient = new Client({ brokerURL: wsurl });
  stompclient.onWebSocketError = (event) => {
    console.log("WS-error"); /* WS-Error */
  };
  stompclient.onStompError = (frame) => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  stompclient.onConnect = (frame) => {
    stompclient.subscribe(DEST, (message) => {
      mouseState.mouse = JSON.parse(message.body);
      console.log(
        "mouse-x: " +
          mouseState.mouse.x +
          " mouse-y: " +
          mouseState.mouse.y +
          " user: " +
          mouseState.mouse.sessionID
      );
    });
  };
  stompclient.activate();
  stompclient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}

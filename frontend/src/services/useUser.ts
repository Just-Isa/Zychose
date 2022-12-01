import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Mouse, type IMouse } from "./IMouse";
import { User, type IUser } from "./IUser";
import { MessageOperator } from "./MessageOperators";

export interface IMouseState {
  mouse: IMouse;
  errorMessage: string;
}

const mouseState = reactive<IMouseState>({
  mouse: new Mouse("", 0, 0, 0),
  errorMessage: "",
});

interface UserDTO {
  user: IUser;
}

//zugreifbar gemacht
export function useUser() {
  return {
    publishUser,
    publishMouse,
    receiveMouse,
    createUser,
    mouseState: readonly(mouseState),
  };
}

//um einen User zum Server zu schicken.
function publishUser(operator: string, user: IUser) {
  const userDto: UserDTO = {
    user: user,
  };
  console.log(userDto);
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/user";
  const userClient = new Client({ brokerURL: webSocketUrl });
  userClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  userClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  userClient.onConnect = (frame) => {
    console.log("connected", frame);
    try {
      userClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(user),
      });
    } catch (err) {
      // in case of an error
      console.log("Es gab ein fehler", err);
    }
  };
  userClient.activate();
  userClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}
//function sends Mouse to a server.
function publishMouse(mouse: IMouse) {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/mouse";
  const userClient = new Client({ brokerURL: webSocketUrl });
  userClient.onWebSocketError = () => {
    console.log("WS-error-mouse"); /* WS-Error */
  };
  userClient.onStompError = () => {
    console.log("STOMP-error-mouse"); /* STOMP-Error */
  };
  userClient.onConnect = () => {
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
  const WebSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/mouse";
  const stompClient = new Client({ brokerURL: WebSocketUrl });
  stompClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  stompClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
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
  stompClient.activate();
  stompClient.onDisconnect = () => {
    /* Verbindung abgebaut*/
  };
}

function createUser() {
  if (document.cookie.split("=")[0] != "sid") {
    document.cookie = "sid=" + crypto.randomUUID();
    const user = new User(
      document.cookie.split("=")[1],
      1,
      document.cookie.split("=")[1]
    );
    publishUser("CREATE", user);
  }
}

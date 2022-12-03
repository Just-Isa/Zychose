import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Mouse, type IMouse } from "./IMouse";
import { User, type IUser } from "./IUser";

export interface IMouseState {
  mouse: IMouse;
  errorMessage: string;
}

export interface IUserState {
  user: IUser
}

const mouseState = reactive<IMouseState>({
  mouse: new Mouse("", 0, 0, 0),
  errorMessage: "",
});

const userState = reactive<IUserState>({
  user: new User("", 0, "")
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
    userState: readonly(userState)
  };
}

/** Publishes user to the User topic
 * 
 * @param operator *NOT IMPLEMENTED*
 * @param user User that is to be published
 */
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

/** Publishes current state of the clients mouse to the respective
 *  mouse topic.
 * 
 * @param mouse Current Mouse object of client
 * @param roomNumber roomNumber of the mouse topic
 */
function publishMouse(mouse: IMouse, roomNumber: number) {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/mouse/"+roomNumber;
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

/** Subscribes to rooms mouseTopic
 * 
 * @param roomNumber roomNumber for the mouse topic that is to be subscribed to
 */
function receiveMouse(roomNumber: number) {
  const WebSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/mouse/"+roomNumber;
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
  console.log("Activated: " + DEST);
  stompClient.onDisconnect = () => {
    stompClient.unsubscribe(DEST);
  };
}

/** Creates a User by setting the sessionID cookie* 
 */
function createUser() {
  if (document.cookie.split("=")[0] != "sid") {
    document.cookie = "sid=" + crypto.randomUUID();
    userState.user.currentRoomNumber = 0;
    userState.user.sessionID = document.cookie.split("=")[1];
    userState.user.userName = document.cookie.split("=")[1];
    publishUser("CREATE", userState.user);
  }
}

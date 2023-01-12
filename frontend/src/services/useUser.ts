import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Mouse, type IMouse } from "./IMouse";
import { User, type IUser } from "./IUser";
import {
  getSessionIDFromCookie,
  checkIfSessionIDCookieExists,
} from "@/helpers/SessionIDHelper";
const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const publishUserStompClient = new Client({ brokerURL: webSocketUrl });
const publishMouseStompClient = new Client({ brokerURL: webSocketUrl });
const receiveMouseStompClient = new Client({ brokerURL: webSocketUrl });

export interface IMouseState {
  mouse: IMouse;
  errorMessage: string;
}

export interface IUserState {
  user: IUser;
}

const mouseState = reactive<IMouseState>({
  mouse: new Mouse("", 0, 0, 0),
  errorMessage: "",
});

const userState = reactive<IUserState>({
  user: new User("", 0, ""),
});

//zugreifbar gemacht
export function useUser() {
  return {
    publishUser,
    publishMouse,
    receiveMouse,
    createUser,
    mouseState: readonly(mouseState),
    userState: readonly(userState),
  };
}

/** Publishes user to the User topic
 *
 * @param operator *NOT IMPLEMENTED*
 * @param user User that is to be published
 */
function publishUser(operator: string, user: IUser) {
  const DEST = "/topic/user";
  if (!publishUserStompClient.connected) {
    publishUserStompClient.activate();
  }
  console.log("connected: ", publishUserStompClient.connected);
  publishUserStompClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  publishUserStompClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  publishUserStompClient.onConnect = () => {
    try {
      publishUserStompClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(user),
      });
    } catch (err) {
      // in case of an error
      console.log("Error while Publishing User! ", err);
    }
  };
}

/** Publishes current state of the clients mouse to the respective
 *  mouse topic.
 *
 * @param mouse Current Mouse object of client
 * @param roomNumber roomNumber of the mouse topic
 */
function publishMouse(mouse: IMouse, roomNumber: number) {
  const DEST = "/topic/mouse/" + roomNumber;
  if (!publishMouseStompClient.connected) {
    publishMouseStompClient.activate();
  }
  publishMouseStompClient.onWebSocketError = () => {
    console.log("WS-error-mouse"); /* WS-Error */
  };
  publishMouseStompClient.onStompError = () => {
    console.log("STOMP-error-mouse"); /* STOMP-Error */
  };
  try {
    publishMouseStompClient.publish({
      destination: DEST,
      headers: {},
      body: JSON.stringify(mouse),
    });
  } catch (fehler) {
    // In case of an error
    console.log("Es gab ein fehler", fehler);
  }
}

/** Subscribes to rooms mouseTopic
 *
 * @param roomNumber roomNumber for the mouse topic that is to be subscribed to
 */
function receiveMouse(roomNumber: number) {
  const DEST = "/topic/mouse/" + roomNumber;

  if (!receiveMouseStompClient.connected) {
    receiveMouseStompClient.activate();
  }

  receiveMouseStompClient.onWebSocketError = () => {
    console.log("WS-error"); /* WS-Error */
  };
  receiveMouseStompClient.onStompError = () => {
    console.log("STOMP-error"); /* STOMP-Error */
  };
  receiveMouseStompClient.onConnect = () => {
    receiveMouseStompClient.subscribe(DEST, (message) => {
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
}

/** Creates a User by setting the sessionID cookie*
 */
function createUser() {
  if (!checkIfSessionIDCookieExists()) {
    document.cookie = "sid=" + crypto.randomUUID();
    userState.user.currentRoomNumber = 0;
    userState.user.sessionID = getSessionIDFromCookie();
    userState.user.userName = getSessionIDFromCookie();
    publishUser("CREATE", userState.user);
  }
}

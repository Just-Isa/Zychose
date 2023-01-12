import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Mouse, type IMouse } from "./IMouse";
import { User, type IUser } from "./IUser";
import {
  getSessionIDFromCookie,
  checkIfSessionIDCookieExists,
} from "@/helpers/SessionIDHelper";
import { logger } from "@/helpers/ConsoleLoggingManager";

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
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/user";
  const userClient = new Client({ brokerURL: webSocketUrl });
  userClient.onWebSocketError = () => {
    logger.log("WS-error"); /* WS-Error */
    location.href = "/500";
  };
  userClient.onStompError = () => {
    logger.log("STOMP-error"); /* STOMP-Error */
    location.href = "/500";
  };
  userClient.onConnect = (frame) => {
    logger.log("connected", frame);
    try {
      userClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(user),
      });
    } catch (err) {
      // in case of an error
      logger.log("Error while Publishing User! ", err);
      location.href = "/500";
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
  const DEST = "/topic/mouse/" + roomNumber;
  const userClient = new Client({ brokerURL: webSocketUrl });
  userClient.onWebSocketError = () => {
    logger.log("WS-error-mouse"); /* WS-Error */
    location.href = "/500";
  };
  userClient.onStompError = () => {
    logger.log("STOMP-error-mouse"); /* STOMP-Error */
    location.href = "/500";
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
      logger.log("Es gab ein fehler", fehler);
      location.href = "/500";
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
  const DEST = "/topic/mouse/" + roomNumber;
  const stompClient = new Client({ brokerURL: WebSocketUrl });
  stompClient.onWebSocketError = () => {
    logger.log("WS-error"); /* WS-Error */
    location.href = "/500";
  };
  stompClient.onStompError = () => {
    logger.log("STOMP-error"); /* STOMP-Error */
    location.href = "/500";
  };
  stompClient.onConnect = () => {
    stompClient.subscribe(DEST, (message) => {
      mouseState.mouse = JSON.parse(message.body);
      logger.log(
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
  logger.log("Activated: " + DEST);
  stompClient.onDisconnect = () => {
    stompClient.unsubscribe(DEST);
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

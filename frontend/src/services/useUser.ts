import { Client } from "@stomp/stompjs";
import { reactive, readonly } from "vue";
import { Mouse, type IMouse } from "../model/IMouse";
import { User, type IUser } from "../model/IUser";
import {
  getSessionIDFromCookie,
  checkIfSessionIDCookieExists,
} from "@/helpers/SessionIDHelper";
import { logger } from "@/helpers/Logger";

const webSocketUrl = `ws://${window.location.host}/stompbroker`;
const publishUserStompClient = new Client({ brokerURL: webSocketUrl });
const receiveMouseStompClient = new Client({ brokerURL: webSocketUrl });
const publishMouseStompClient = new Client({ brokerURL: webSocketUrl });

const publishMouseStompClientConnection = setInterval(function () {
  if (!publishMouseStompClient.connected) {
    publishMouseStompClient.activate();
  } else {
    clearTimeout(publishMouseStompClientConnection);
  }
}, 20);

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
  user: new User("", 0, "", new Date().getTime()),
});

//zugreifbar gemacht
export function useUser() {
  return {
    publishUser,
    publishMouse,
    publishNewVehicle,
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
  publishUserStompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  publishUserStompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  publishUserStompClient.onConnect = () => {
    try {
      publishUserStompClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(user),
      });
    } catch (err) {
      logger.error("Error while publishing user! ", err);
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
  publishMouseStompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  publishMouseStompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  try {
    publishMouseStompClient.publish({
      destination: DEST,
      headers: {},
      body: JSON.stringify(mouse),
    });
  } catch (err) {
    logger.error("Error while publishing mouse", err);
  }
  publishMouseStompClient.activate();
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
  receiveMouseStompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  receiveMouseStompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };

  receiveMouseStompClient.onConnect = () => {
    receiveMouseStompClient.subscribe(DEST, (message) => {
      mouseState.mouse = JSON.parse(message.body);
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
    userState.user.loginTime = new Date().getTime();
    publishUser("CREATE", userState.user);
  }
}

function publishNewVehicle(operator: string, user: IUser) {
  const DEST = "/topic/createVehicle";
  if (!publishUserStompClient.connected) {
    publishUserStompClient.activate();
  }
  publishUserStompClient.onWebSocketError = (event) => {
    logger.error("WS-error", JSON.stringify(event)); /* WS-Error */
    location.href = "/500";
  };
  publishUserStompClient.onStompError = (frame) => {
    logger.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
    location.href = "/500";
  };
  publishUserStompClient.onConnect = () => {
    try {
      publishUserStompClient.publish({
        destination: DEST,
        headers: {},
        body: JSON.stringify(user),
      });
    } catch (err) {
      logger.error("Error while publishing user! ", err);
    }
  };
}

import type { Client } from "@stomp/stompjs";

export function stompErrors(stompClient: Client) {
  stompClient.onWebSocketError = (event) => {
    console.error("WS-error", JSON.stringify(event)); /* WS-Error */
  };
  stompClient.onStompError = (frame) => {
    console.error("STOMP-error", JSON.stringify(frame)); /* STOMP-Error */
  };
}
export function checkStompConnect(stompClient: Client) {
  if (!stompClient.connected) {
    stompClient.activate();
  }
}
export function stompPublishData(stompClient: Client, DEST: string, data: any) {
  try {
    stompClient.publish({
      destination: DEST,
      headers: {},
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("publish-Error", err);
  }
}

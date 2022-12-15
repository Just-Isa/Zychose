import { Client } from "@stomp/stompjs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function publishUploadData(file: File) {
  const webSocketUrl = `ws://${window.location.host}/stompbroker`;
  const DEST = "/topic/room";
  const userClient = new Client({ brokerURL: webSocketUrl });

  const reader = new FileReader();
  // reads and encodes the file as a base64 string
  reader.readAsDataURL(file);
  // onloadend gets triggered when the file read above was completed
  reader.onloadend = () => {
    console.log(`HIER: ${JSON.stringify(reader.result)}`);

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
          body: JSON.stringify(reader.result),
        });
      } catch (err) {
        // in case of an error
        console.log("Error while Publishing User! ", err);
      }
    };
    userClient.activate();
    userClient.onDisconnect = () => {
      /* Verbindung abgebaut*/
    };
  };
}

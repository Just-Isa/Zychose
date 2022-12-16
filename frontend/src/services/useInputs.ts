import { reactive, readonly } from "vue";

//map wo allw s
const keysPressed = reactive(new Map<string, boolean>());

export function useInputs() {
  return { keysPressed: readonly(keysPressed), inputs };
}

/**
 * Detects when a key gets pressed and changes the boolen of that key in the map to true,
 * when key gets released the boolean will set to false again.
 */
function inputs() {
  document.addEventListener("keydown", (event) => {
    keysPressed.set(event.key, true);
    console.log("keyPressed:", keysPressed);
  });

  document.addEventListener("keyup", (event) => {
    keysPressed.set(event.key, false);
  });
}

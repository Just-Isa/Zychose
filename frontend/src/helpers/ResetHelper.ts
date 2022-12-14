export function resetEverything() {
  const DEST = "/api/reset";
  fetch(DEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Error @ Restarting everything.");
      } else {
        return response.text();
      }
    })
    .then(() => {
      console.log("Done! Game has been reset. Please refresh.");
    })
    .catch(() => {
      console.log("Error @ Restarting everything.");
    });
}

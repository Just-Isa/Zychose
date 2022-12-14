/**
 * funtion for converting the json object to block array
 *
 * @param jsondata
 * @returns streetArray
 */
export function generateMapArray(jsondata: object[]) {
  const size = 100;
  const streetArray: string[][] = new Array();

  // initialize empty street array
  for (let i = 0; i < size; i++) {
    streetArray[i] = [];
    for (let j = 0; j < size; j++) {
      streetArray[i][j] = "";
    }
  }

  // fill street array with types according to given coordinates
  jsondata.forEach(function (obj) {
    streetArray[Object(obj)["posX"]][Object(obj)["posY"]] =
      Object(obj)["streetType"] + ":" + Object(obj)["rotation"];
  });

  return streetArray;
}

/**
 * funtion for converting the json object to block array
 *
 * @param jsonData
 * @returns streetArray
 */
export function generateMapArray(jsonData: object[]) {
  const size = 100;

  // initialize empty street array
  const streetArray = new Array(size)
    .fill("")
    .map(() => new Array(size).fill(""));

  // fill street array with types according to given coordinates
  jsonData.forEach(function (obj) {
    streetArray[Object(obj)["posX"] - 1][Object(obj)["posY"] - 1] =
      Object(obj)["streetType"] + ":" + Object(obj)["rotation"];
  });

  return streetArray;
}

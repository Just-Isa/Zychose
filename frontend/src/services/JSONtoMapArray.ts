/**
 * funtion for converting the json object to block array
 *
 * @param jsondata
 * @returns streetArray
 */
export function generateMapArray(jsondata: object) {
  const size = 100;
  const rotations = new Array();
  const streetTypes = new Array();
  const streetArray: string[][] = new Array();

  // dynamically read street types
  for (const element of Object.keys(jsondata)) {
    streetTypes.push(element);
  }

  // dynamically read street type orientations/rotations (in this case: from the first street type)
  for (const element of Object.keys(Object(jsondata)[streetTypes[0]])) {
    rotations.push(element);
  }

  // initialize empty street array
  for (let i = 0; i < size; i++) {
    streetArray[i] = [];
    for (let j = 0; j < size; j++) {
      streetArray[i][j] = "";
    }
  }

  // fill street array with types according to given coordinates
  for (const i in streetTypes) {
    const streetType = Object(jsondata)[streetTypes[i]];
    for (const j in rotations) {
      const rotation = Object(streetType)[rotations[j]];
      for (const z in rotation) {
        const coords = rotation[z];
        streetArray[coords[0]][coords[1]] = streetTypes[i] + ":" + rotations[j];
      }
    }
  }

  return streetArray;
}

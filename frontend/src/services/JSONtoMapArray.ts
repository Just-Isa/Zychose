export function generateMapArray(jsondata: object) {
    let size = 100;
    //let rotations = [0, 90, 180, 270];
    let rotations = new Array();
    //let streetTypes = ["street", "t-junction"];
    let streetTypes = new Array();
    let streetArray: String[][] = new Array();

    // dynamically read street types
    for (const element of Object.keys(jsondata)) {
        streetTypes.push(element);
    }

    // dynamically read street type orientations/rotations (in this case: from the first street type)
    for (let i = 0; i < Object.keys(Object(jsondata)[streetTypes[0]]).length; i++) {
        rotations.push(Object.keys(Object(jsondata)[streetTypes[0]])[i]);
    }

    // initialize empty street array
    for (let i = 0; i < size; i++) {
        streetArray[i] = [];
        for (let j = 0; j < size; j++) {
            streetArray[i][j] = "";
        }
    }

    // fill street array with types according to given coordinates
    for (let i = 0; i < streetTypes.length; i++) {
        let streetType = Object(jsondata)[streetTypes[i]];
        for (let j = 0; j < rotations.length; j++) {
            let rotation = Object(streetType)[rotations[j]];
            for (let z = 0; z < rotation.length; z++) {
                let coords = rotation[z];
                streetArray[coords[0]][coords[1]] = streetTypes[i] + ":" + rotations[j];
            }
        }
    }
    
    return streetArray;
}
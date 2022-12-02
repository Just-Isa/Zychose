import { TypeStreet, type IStreetInformation } from '../components/grid/useStreets';

// get the readonly-street-state
// const {streets} = useStreets();

// leider doch nich so einfach
//let list = JSON.stringify(streets);

enum Rotations {
    ZERO=0,NINETY=90,ONEEIGHTY=180,TWOSEVENTY=270
}

export function gridToJson(streets: IStreetInformation[]) {

    let streettypeAsKeyMap = new Map();

    const keys = Object.keys(TypeStreet).filter((v) => !isNaN(Number(v)));

    const rotations = [0,90,180,270];

    // // iterate over the values (1,2,3,4) of the enum
    // keys.forEach((stype) => {
    //     const filteredStreets = streets.filter(element => element.streettype === Number(stype));

    //     console.log(`FILTERED STREETS: ${filteredStreets.forEach(ele => console.log(ele.streettype, ele.rotation, ele.posX, ele.posY))}`);

    //     // finds the value to the values defined it the Rotations enum
    //     rotations.forEach((rot) => {
    //         const filteredRotations = filteredStreets.filter(element => element.rotation === Number(rot));
    //         let positionArray = [];
    //         let rotationAsKeyMap = new Map();

    //         for(let ele of filteredRotations) {
    //             positionArray.push([ele.posX, ele.posY]);
    //         }

    //         rotationAsKeyMap.set(rot, positionArray);

    //         streettypeAsKeyMap.set(stype, rotationAsKeyMap);
    //     })


    // })

    // TODO: FOR-EACH war das problem, normale for schleife lösts

    for (let k of keys) {
        
        const filteredStreets = streets.filter(element => element.streettype === Number(k));

        console.log(`FILTERED STREETS: ${filteredStreets.forEach(ele => console.log(ele.streettype, ele.rotation, ele.posX, ele.posY))}`);

        let rotationAsKeyMap = new Map();
        
        for (let r of rotations) {
            const filteredRotations = filteredStreets.filter(element => element.rotation === Number(r));
            let positionArray = [];

            for(let ele of filteredRotations) {
                positionArray.push([ele.posX, ele.posY]);
            }

            rotationAsKeyMap.set(r, positionArray);

        }
        streettypeAsKeyMap.set(k, rotationAsKeyMap);

    }

    console.log(streettypeAsKeyMap);
    let dings = JSON.stringify(Array.from(streettypeAsKeyMap.entries()));
}



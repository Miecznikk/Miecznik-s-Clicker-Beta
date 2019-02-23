import Uczen from './uczen';
import Artifact from './artifact';
import {ArtifactButtonsArr} from './buttons';
import {UczenButtonsArr} from './buttons';

const artifact_box_arr=[
    document.querySelector(".costOfPilot"),
    document.querySelector(".costOfPass"),
    document.querySelector(".costOfTip"),
    document.querySelector(".costOfKey209"),
    document.querySelector(".costOfZaplecze")
];

const uczen_box_arr=[
    document.querySelector(".costOfZamojda"),
    document.querySelector(".costOfMaurycy"),
    document.querySelector(".costOfGiru"),
    document.querySelector(".costOfTomek"),
    document.querySelector(".costOfKrychu"),
    document.querySelector(".costOfDominik"),
    document.querySelector(".costOfRydzu"),
    document.querySelector(".costOfSwiderski"),
    document.querySelector(".costOfPoskrobko"),
];

export const artifact_Arr=[
    new Artifact(10,1,0,artifact_box_arr[0]),
    new Artifact(100,6,0,artifact_box_arr[1]),
    new Artifact(500, 12,0,artifact_box_arr[2]),
    new Artifact(2000, 50,0,artifact_box_arr[3]),
    new Artifact(10000,100,0,artifact_box_arr[4])
];

export const uczen_Arr=[
    new Uczen(10,1,0,uczen_box_arr[0]),
    new Uczen(100,15,0,uczen_box_arr[1]),
    new Uczen(600,40,0,uczen_box_arr[2]),
    new Uczen(3000, 185,0,uczen_box_arr[3]),
    new Uczen(10000, 250,0,uczen_box_arr[4]),
    new Uczen(50000, 500,0,uczen_box_arr[5]),
    new Uczen(150000, 1200,0,uczen_box_arr[6]),
    new Uczen(500000, 5000,0,uczen_box_arr[7]),
    new Uczen(2000000, 30000,0,uczen_box_arr[8])
];
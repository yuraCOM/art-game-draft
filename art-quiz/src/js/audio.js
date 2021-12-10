import {getBaseFromLocalStorage} from "./database-local-store";

export let startAudio = new Audio();
export let pushAudio = new Audio();
export let audioRight = new Audio();
export let audioWrong = new Audio();

startAudio = new Audio('assets/audio/start.mp3');
pushAudio = new Audio('assets/audio/audio00.mp3');
audioRight = new Audio('assets/audio/right.mp3');
audioWrong = new Audio('assets/audio/wrong.mp3');


// проверяем звук включен/выкл и в зависимости от отвеат - звуковой сигнал при ответе -картчока ответа
export function getAudioPlay(result) {
    let checkAudio = getBaseFromLocalStorage('audioOn')
    checkAudio ? result ? audioRight.play() : audioWrong.play() : false
}

export function getPushAudioPlay() {
    let checkAudio = getBaseFromLocalStorage('audioOn')
    checkAudio ? pushAudio.play() : false
}

//вень звука из локал стора
// export function getVolumeAudio() {
//     let audioRange = getBaseFromLocalStorage('audioRange')
//     audioWrong.volume = audioRange / 100
//     audioRight.volume = audioRange / 100
//     pushAudio.volume = audioRange / 100
//     startAudio.volume = audioRange/100
// }


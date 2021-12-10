import {getBaseFromLocalStorage, saveLocalStore, updateLocalStore} from "./database-local-store";
import {btnTools} from "../index";
import {getPushAudioPlay, pushAudio} from "./audio";
import {getVolumeAudio} from "./pop-result";


export let audioOn = true
export let audioRange = 50

updateLocalStore('audioOn', audioOn)
updateLocalStore('audioRange', audioRange)

export async function getTools (){
    let mainSection = document.querySelector('.main-sec')
    let toolsPopUp = document.createElement('div')
    toolsPopUp.classList.add('tools')
    toolsPopUp.innerHTML = `
        <div class="audio-tools">
            <label>Volume range
                <input class="vol-range" type="range">
            </label>
            <label> Volume on/of
                <input class="vol-on-off" type="checkbox" checked>
            </label>
            
        </div>
        <div class="clear-local-store">
            <button class="clear-artists">Del Artists Score</button>
            <button class="clear-pictures">Del Pictures Score</button>
            <button class="reset-all">Reset All (New Game)</button>
        </div>
        <button class="save-tools">Save</button>
        
    `
    await mainSection.append(toolsPopUp)

    let btnSaveTools = document.querySelector('.save-tools')
    let btnDelArtistsScore = document.querySelector('.clear-artists')
    let btnDelPictureScore = document.querySelector('.clear-pictures')
    let btnResetAll = document.querySelector('.reset-all')

    // берем из локал-стор уровень звука
    let volRange = document.querySelector('.vol-range')
    volRange.value = Number (getBaseFromLocalStorage('audioRange'))

    // берем из локалстора - вкл/выкл звук - установить чекед в настрйоках
    let audioOn = document.querySelector('.vol-on-off')
    audioOn.checked = getBaseFromLocalStorage('audioOn')

    btnSaveTools.addEventListener('click', ()=>{
        volRange = document.querySelector('.vol-range').value
        let volMute = document.querySelector('.vol-on-off').checked
        volMute ? pushAudio.play(): false
        // console.log('volRange = ', volRange, 'volMute = ', volMute )
        audioOn = volMute
        audioRange = volRange
        saveLocalStore('audioOn', audioOn)
        saveLocalStore('audioRange', audioRange)
        getVolumeAudio()

        toolsPopUp.remove()
        btnTools.style.pointerEvents = 'auto'
    })

    btnDelArtistsScore.addEventListener('click', ()=>{
        getPushAudioPlay()
        localStorage.removeItem("scoreArtistsBase")
    })
    btnDelPictureScore.addEventListener('click', ()=>{
        getPushAudioPlay()
        localStorage.removeItem("scorePicturesBase")
    })
    btnResetAll.addEventListener('click', ()=>{
        getPushAudioPlay()
        localStorage.removeItem("artistsBase")
        localStorage.removeItem("picturesBase")
        localStorage.removeItem("arrRightAnswer")

    })
}


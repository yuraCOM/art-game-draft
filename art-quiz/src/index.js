//https://www.npmjs.com/package/remove-console-webpack-plugin
//https://coderoad.ru/41040266/%D0%A3%D0%B4%D0%B0%D0%BB%D0%B8%D1%82%D1%8C-console-logs-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-Webpack-%D0%B8-%D1%83%D1%80%D0%BE%D0%B4%D0%BE%D0%B2%D0%B0%D1%82%D1%8C


// делал по этому заданию
//https://github.com/rolling-scopes-school/tasks/blob/master/tasks/art-quiz/art-quiz.md

import {getBaseFromLocalStorage, updateLocalStore} from "./js/database-local-store";
import {data120, getRandomNum} from "./js/random";
import {GetCategory} from "./js/artists-category";
import {arrSrcAllPic, DataArtistCategories, DataPictureCategories, getPagePics} from "./js/data";
import {getAllScore, saveScoreCategory} from "./js/score";
import {getPushAudioPlay, startAudio} from "./js/audio";
import {getTools} from "./js/tools";
import {clearQuestionAndScoreStage, getVolumeAudio} from "./js/pop-result";
import artistsJsonData from '/js/artists.json';

import {
    allScoresBlock,
    getModalBlock,
    infoPicsModal,
    infoRulesModal,
    infoStartModal,
    startInfo
} from "./js/modal-start";
import {findPicAuthor, getAllAuthors, getPageAllAuthor} from "./js/all-authors";
//styles css
import './style.css'
import './css/prev-all-pic.css'
import './css/all-artist-style.css'
import './css/media-768-1439.css'
import './css/media-375-766.css'
import './css/media-360.css'
import './css/modal-style.css'


window.onload = function(){
    document.getElementById("hideAll").style.display = "none";
}

export let btnHome = document.querySelector('.return-start')
export let btnCategory = document.querySelector('.return-category')
export let btnTools = document.querySelector('.btn-tools')

export let btnArtist = document.querySelector('.artist')
export let btnPicture = document.querySelector('.pictures')
export let btnAllPicInfo = document.querySelector('.all-pic-info')
export let btnAllAuthors = document.querySelector('.all-author')

let startScreen = document.querySelector('.main-window')
export let artistQuiz = document.querySelector('.artist-quiz')

export let currentCategory = ''

let footer = document.querySelector('footer')

let btnRules = document.querySelector('.gameRules')

getImgOnStart()
getVolumeAudio()
// let allPictures
let allAuthors
startInfo(getModalBlock(infoStartModal), 1)
setTimeout(()=>{
    let checkAudio = getBaseFromLocalStorage('audioOn')
    checkAudio ? startAudio.play() :  false
    // document.querySelector('.temporary').remove()
    !document.querySelector('.temporary') ? false : document.querySelector('.temporary').remove()
    allAuthors =  getAllAuthors(artistsJsonData)
    }, 3000)

// меняется картинка заставка при старте главного эерана
function getImgOnStart(){
    let randomN = getRandomNum(1, 240)
    document.querySelector('.main-window').style.backgroundImage = `url(https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${randomN}.jpg)`
}

// кнопка настройки
btnTools.addEventListener('click', ()=>{
    getPushAudioPlay()
    btnTools.style.pointerEvents = 'none'
    getTools()
})

//кнопка викторина по автору - в кнопку передана название викторины
// currentCategory = 'artistsBase' - исходя из этого будет выбарана база для вопросов
btnArtist.addEventListener('click', function () {
    getPushAudioPlay()
    currentCategory = 'artistsBase'
    let baseArtists = data120()
    updateLocalStore('artistsBase', baseArtists)

    saveScoreCategory(currentCategory)

    let x = new GetCategory(DataArtistCategories, currentCategory)
    x.getCategory()
    makeStartScreen()
})

//кнопка викторина по картине
btnPicture.addEventListener('click', function () {
    getPushAudioPlay()
    currentCategory = 'picturesBase'
    let basePictures = data120()
    updateLocalStore('picturesBase', basePictures)
    saveScoreCategory(currentCategory)

    let pictures = new GetCategory(DataPictureCategories, currentCategory)
    pictures.getCategory()
    makeStartScreen()
})

btnAllPicInfo.addEventListener('click', function (){
    getPushAudioPlay()
    makeStartScreen()

    //divideArrAllPicOnPage - получили массив всех картин(пути) - разбили все картины на 10 старницы по 24картины
    // каждый массив состоит из подмассива
    //divideArrAllPicOnPage[0] - путь к файлу
    //divideArrAllPicOnPage[1] - путь к айди картині
    let divideArrAllPicOnPage = arrSrcAllPic(240,24)


    artistQuiz.append(getPagePics( divideArrAllPicOnPage, 0)[0])

    function getImgCardinAllPic(){
        let imgCardinAllPic = document.querySelectorAll('.preview-img')
        imgCardinAllPic.forEach( item =>{
            arrRightAnswer.includes(Number(item.id)) ? item.style.filter = 'grayscale(0)' : false
            item.addEventListener('click', ()=>{
                startInfo(getModalBlock(infoPicsModal(artistsJsonData[item.id], item.id )), 0)
                document.querySelector('.modal-content').style.padding ='15px 0'
                document.querySelector('.modal-content').style.width ='100%'
                document.querySelector('.modal-content').style.margin ='0 auto'
                getPushAudioPlay()
            })
        })
    }


    let arrRightAnswer = getBaseFromLocalStorage ('arrRightAnswer') || []
    getImgCardinAllPic()
    //todo --------------------
    // let imgCardinAllPic = document.querySelectorAll('.preview-img')
    // imgCardinAllPic.forEach( item =>{
    //     arrRightAnswer.includes(Number(item.id)) ? item.style.filter = 'grayscale(0)' : false
    //     item.addEventListener('click', ()=>{
    //         startInfo(getModalBlock(infoPicsModal(artistsJsonData[item.id], item.id )), 0)
    //         document.querySelector('.modal-content').style.padding ='15px 0'
    //         document.querySelector('.modal-content').style.width ='100%'
    //         document.querySelector('.modal-content').style.margin ='0 auto'
    //         getPushAudioPlay()
    //     })
    // })
    //// ---------------

    let btnGallerys = document.querySelectorAll('.btn-page-pic')
    btnGallerys.forEach( item =>{
        item.addEventListener('click', ()=>{
            getPushAudioPlay()
            btnGallerys.forEach( item =>  item.classList.remove('btn-search') )
            console.log(item.id)
            let numPageGallery = item.id
            let x = document.querySelector(".all-pictures")
            x.innerHTML = ''
            x.append(getPagePics( arrSrcAllPic(240,24), numPageGallery)[1])
            btnGallerys[numPageGallery].classList.add('btn-search')
            getImgCardinAllPic()
        })
    })

})

//информация по художникам
btnAllAuthors.addEventListener( 'click', ()=>{
    getPushAudioPlay()
    makeStartScreen()
    // let allAuthors =  getAllAuthors(artistsJsonData)
    allAuthors.then( data =>{
        getPageAllAuthor(data).then( data =>{
            artistQuiz.append(data)
            let btnAuthor = document.querySelectorAll('.author-btn')
            btnAuthor.forEach(item =>{
                item.addEventListener('click', ()=>{
                    console.log(item.innerHTML)
                    let arrPicAuthor = findPicAuthor(item.innerHTML, artistsJsonData)
                    console.log(arrPicAuthor)
                    let blockPic =''
                    arrPicAuthor.forEach( item =>{
                        blockPic+= infoPicsModal(artistsJsonData[item], item)
                    })
                    console.log(blockPic)
                    startInfo(getModalBlock(blockPic), 0)
                    getPushAudioPlay()
                })
            })
        })
    })
})

//очки по игре
let btnScores = document.querySelector('.ScoreS')
btnScores.addEventListener('click', ()=>{
    getPushAudioPlay()
    let allScore = getAllScore()
    console.log(allScore)
    //формируем блок
    let blockScore = allScoresBlock(allScore.sum, allScore.objAllScoreAuthors, allScore.objAllScorePictures )

    // формируем модальное окно
    let blockModal =  getModalBlock(blockScore)

   // start modal window
    startInfo(blockModal, 0)
})

//возврат к категориям
btnCategory.addEventListener('click', ()=>{
    getPushAudioPlay()
    clearQuestionAndScoreStage()
    artistQuiz.style.left = '100%'
    setTimeout(()=>{
        artistQuiz.innerHTML = ''

        if(currentCategory === 'artistsBase'){
            let x = new GetCategory(DataArtistCategories, currentCategory)
            x.getCategory()
        }
        if(currentCategory === 'picturesBase'){
            let pictures = new GetCategory(DataPictureCategories, currentCategory)
            pictures.getCategory()
        }

        btnCategory.classList.toggle('no-hide')
        artistQuiz.style.left = '0'
    }, 1000)

})

btnHome.addEventListener('click', ()=>{
    getPushAudioPlay()

    currentCategory = ''
    artistQuiz.style.left = '100%'
    clearQuestionAndScoreStage()

    setTimeout(()=>{
        artistQuiz.innerHTML = ''
        startScreen.style.right = `0`
        btnHome.classList.toggle('no-hide')
        btnCategory.classList.contains('no-hide') ? btnCategory.classList.remove('no-hide') : false
        footer.style.display = 'flex'
        btnTools.classList.remove('hide')
    }, 1000)

})


function hideFooter() {
    footer.style.display = 'none'
}

btnRules.addEventListener('click', ()=>{
    getPushAudioPlay()
    startInfo(getModalBlock(infoRulesModal), 0)

})

// показываем  btnHome, прячем btnTools, сдвиг startScreen + очистка, причем футер
function makeStartScreen() {
    btnHome.classList.toggle('no-hide')
    btnTools.classList.add('hide')
    startScreen.style.right = `100%`

    setTimeout(()=>{
        artistQuiz.style.left = '0'
        hideFooter()
    }, 1000)
}






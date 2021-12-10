import {artistQuiz, currentCategory} from "../index";
import {
    ArtistQuestion,
    countCurrentQuest,
    currentCategoryNumber,
    objCurrentRoundAnswers,
    PictureQuestion
} from "./artists-category";
import {getBaseFromLocalStorage} from "./database-local-store";
import {audioRight, audioWrong, getAudioPlay, getPushAudioPlay, pushAudio, startAudio} from "./audio";
import {saveScoreCategory} from "./score";
import {getModalBlock, infoPicsModal, startInfo} from "./modal-start";
import artistsJsonData from '/js/artists.json';


//todo nextQuestNumBuffer = 0
export let nextQuestNumBuffer = 0
export let scoreCurrentStage = 0


// карточка ответа правильно/неправильно
export class PopResult {
    constructor(result, rightNumAnswer, rightNameArtist) {
        this.result = result
        this.rightNumAnswer = rightNumAnswer
        this.rightNameArtist = rightNameArtist
    }

    getShowResult() {
        artistQuiz.style.left = '100%'

        let newDivCardResult = document.createElement("div");
        newDivCardResult.classList.add('newDivCardResult')

        let x = this.rightNumAnswer
        let answerAuthor = this.rightNameArtist.author
        let answerCallPic = this.rightNameArtist.name
        let answerYearPic = this.rightNameArtist.year

        // console.log(this.rightameArtist)
        newDivCardResult.innerHTML += `
            <div class="result-pic"></div> 
            <div class="img-card" id="${x}">
                <img src="https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${x}.jpg" alt="img${x}">
            </div>
            <p>Автор: <i>${answerAuthor}</i></p>
            <p>Название: <i>${answerCallPic}</i></p>
            <p>Год: <i>${answerYearPic}</i></p>
            <button class="next-quest">Next</button>
        `
        getVolumeAudio()
        getAudioPlay(this.result)

        setTimeout(() => {

            artistQuiz.innerHTML = ''
            artistQuiz.append(newDivCardResult)

            let resultAnswerPic = document.querySelector('.result-pic')
            this.result ? resultAnswerPic.style.backgroundImage = "url('assets/png/right.png')" : resultAnswerPic.style.backgroundImage = "url('assets/png/wrong.png')"
            artistQuiz.style.left = '0'

            this.result ? scoreCurrentStage += 1 : false
            console.log("scoreCurrentStage", scoreCurrentStage)
            saveScoreCategory(currentCategory, currentCategoryNumber, scoreCurrentStage)
            console.log('currentCategory =', currentCategory, 'currentCategoryNumber =', currentCategoryNumber, 'scoreCurrentStage =', scoreCurrentStage)

            let nextQuestButton = document.querySelector('.next-quest')

            nextQuestButton.addEventListener('click', () => {
                console.log('nextQuestNumBuffer ==', nextQuestNumBuffer)
                if (nextQuestNumBuffer >= 9) {
                    console.log("------------", "currentCategoryNumber", currentCategoryNumber, "scoreCurrentStage", scoreCurrentStage)
                    artistQuiz.style.left = '100%'
                    finishStage(scoreCurrentStage)
                    saveScoreCategory(currentCategory, currentCategoryNumber, scoreCurrentStage)
                    clearQuestionAndScoreStage()
                }
                else {
                    console.log("------------", "currentCategoryNumber", currentCategoryNumber, "scoreCurrentStage", scoreCurrentStage, currentCategory)
                    nextQuestCard()
                }
            })
        }, 1500)
    }
}

// формирует следующий вопрос
// let nextQuestNumBuffer = countCurrentQuest
function nextQuestCard() {
    artistQuiz.style.left = '100%'

    console.log('currentCategory = ', currentCategory, 'countCurrentQuest = ', countCurrentQuest, 'currentCategoryNumber = ', currentCategoryNumber)

    nextQuestNumBuffer += 1
    console.log('nextQuestNumBuffer', nextQuestNumBuffer)

    let data = getBaseFromLocalStorage(currentCategory) // общая база по викторине
    data = data[currentCategoryNumber]//
    console.log(data)

    // ---------
    let question
    if (currentCategory === "artistsBase") {
        question = new ArtistQuestion(nextQuestNumBuffer, data)
    }
    if (currentCategory === "picturesBase") {
        question = new PictureQuestion(nextQuestNumBuffer, data)
    }
    console.log(question)

    setTimeout(() => {
        artistQuiz.innerHTML = ''
        question.getRightAnswer()
        question.getCardQuestion()
    }, 1000)
}

// после раунда - после 10го вопроса выдает окно с очками
function finishStage(score) {
    let newDivFinishScore = document.createElement("div")
    newDivFinishScore.classList.add('newDivFinishScore')
    newDivFinishScore.innerHTML += `
            <div class="win">
                <img class="cup" src="../assets/png/cup.png" alt="cup">
                <p>Score: <i>${score} / 10 </i></p>
            </div> 
        `

    //окно вывода резульата раунад + картинки
    let divAnswerPics = document.createElement("div");
    divAnswerPics.classList.add('divAnswerPics')
    Object.entries(objCurrentRoundAnswers).forEach( item =>{
        console.log(item)
        divAnswerPics.innerHTML+=`
                <img id ="${item[0]}" class="pic-answer-round ${!item[1] ? 'wrong-answer' : ''}" src="https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${item[0]}.jpg" alt="img${item[0]}">
        `
    })

    newDivFinishScore.append( divAnswerPics)

    artistQuiz.style.left = '100%'

    setTimeout(() => {
        artistQuiz.innerHTML = ''
        artistQuiz.append(newDivFinishScore)
        let picsAnswersRounds = document.querySelectorAll('.pic-answer-round')
        picsAnswersRounds.forEach( item =>{
            item.addEventListener('click', ()=>{
                console.log(item.id)
                //инфа по картинке
                let infoSelectedPic = infoPicsModal(artistsJsonData[item.id], item.id )
                //// формируем блок для вставки - info - текст для информации в данном блоке
                let infoBlock = getModalBlock(infoSelectedPic)
                // запускает модальное окно - передаем блок для вставки на странице
                getPushAudioPlay()
                startInfo(infoBlock, 0)
            })
        })
        artistQuiz.style.left = '0'
    }, 1010)
}

//функц обнулить текущий вопрос и очки за уровень === 0
export function clearQuestionAndScoreStage() {
    nextQuestNumBuffer = 0
    scoreCurrentStage = 0
    console.log(objCurrentRoundAnswers)
    for (let key in objCurrentRoundAnswers) {
        delete objCurrentRoundAnswers[key];
    }
    console.log(objCurrentRoundAnswers)
}

//устанавливаем уровень звука из локал стора
export function getVolumeAudio() {
    let audioRange = getBaseFromLocalStorage('audioRange')
    audioWrong.volume = audioRange / 100
    audioRight.volume = audioRange / 100
    pushAudio.volume = audioRange / 100
    startAudio.volume = audioRange/100
}


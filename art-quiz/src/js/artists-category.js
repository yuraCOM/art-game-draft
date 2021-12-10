import {getArrRandom, getRandomNum, shuffle} from "./random";
import {getBaseFromLocalStorage, saveRightAnswer} from "./database-local-store";
import {artistQuiz, btnCategory, currentCategory} from "../index";
import artistsJsonData from '/js/artists.json';
import {PopResult, scoreCurrentStage} from "./pop-result";
import {getScoreArr, saveScoreCategory} from "./score";
import {getPushAudioPlay} from "./audio";

//todo countCurrentQuest = 0
export let countCurrentQuest = 0
export let currentCategoryNumber
export let artistCategories = document.querySelector('.artist-quiz')

// vvv - буфер собираем инфу по ответам номер картины и угадано или нет
// vvv = {[1, true], [9, false] }

export let objCurrentRoundAnswers = {}

//класс - формирует категории
//заполняем страничку категориями - используем для категорий по художнику и по картине
export class GetCategory {
    constructor(category, categoryBase) {
        this.category = category
        this.categoryBase = categoryBase
    }

    getCategory() {
        //при загрузке страницы категорий - рендом картинка на заставке категории
        let question01Artist = getArrRandom(240, 12)
        let scoreBaseName = getScoreArr(currentCategory)
        let currentScoreBase = getBaseFromLocalStorage(scoreBaseName)

        // в цикле вставлем категории на страницу
        for (let i = 0; i < this.category.length; i++) {
            artistCategories.innerHTML += `
                <div id = 'a${i}' class="${this.category[i]} art-card ${(currentScoreBase[i] <= 0 || currentScoreBase[i] === undefined) ? 'grayscale' : false}">
                <h3>${this.category[i]}</h3>
                <img src="https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${question01Artist[i]}.jpg" alt="">
                <h3 class="score">Score: <span class="score-num" >${(currentScoreBase[i] === null || currentScoreBase[i] === undefined) ? 0 : currentScoreBase[i]}</span></h3>
            </div> 
            `
        }
        // карточки категорий на странице - навешиваем им события
        let artCards = document.querySelectorAll('.art-card')

        artCards.forEach(item => {
            item.addEventListener('click', () => {
                getPushAudioPlay()
                currentCategoryNumber = item.id.slice(1)
                console.log('num of category ==== ', currentCategoryNumber)
                let currentBase = new ChoiceBase(this.categoryBase)
                currentBase = currentBase.getBase()

                // console.log('------вся база по викторине по автору')
                // console.log(currentBase)

                // console.log('------ выбранная база по категории ')
                // console.log(currentBase[item.id.slice(1)])

                btnCategory.classList.toggle('no-hide')

                artistQuiz.style.left = '100%'

                setTimeout(() => {
                    artistQuiz.innerHTML = ''
                    console.log('this.categoryBase = ', this.categoryBase)
                    if (this.categoryBase === "artistsBase") {
                        let question = new ArtistQuestion(countCurrentQuest, currentBase[item.id.slice(1)])
                        question.getRightAnswer()
                        question.getCardQuestion()
                    }
                    if (this.categoryBase === "picturesBase") {
                        let question = new PictureQuestion(countCurrentQuest, currentBase[item.id.slice(1)])
                        console.log(question)
                        console.log(question, currentBase[item.id.slice(1)])
                        question.getRightAnswer()
                        question.getCardQuestion()
                    }
                }, 1000)
            })
        })
    }
}

//класс - выбран тип викторины (по автору или картине) -- далее выбрана категория из 12
// - и согласно выбранной категории, вернее согласно номеру категории ---
// выбираем базу с которой будем работать
export class ChoiceBase {
    constructor(category, num) {
        this.number = num
        this.category = category
    }

    getBase() {
        return getBaseFromLocalStorage(this.category)
    }

}

//класс -- карточка вопроса по художнику
// номер по порядку вопроса
// массив из текущей базы
export class ArtistQuestion {
    constructor(num, array) {
        //num of category
        this.number = Number(num)
        //arr of selected category
        this.array = array
        // console.log(this.array)
        //текущая база для текущего вопроса - 4картинки
        // this.arrOfCurrentArtQues = this.array[this.number]
        this.arrOfCurrentArtQues = this.array[this.number]
        console.log(this.arrOfCurrentArtQues)
        //правильное имя имя автора
        this.rightAnswerAutor = ''
        // правильный номер ответа
        this.numRightAnswer = ''
        this.arrRightAnswerAllFromBase

    }

    //получаем номер правильного ответа и имя автора для вывода
    // и перемешиваем массив 4х картинок - для вывода на карточку вопроса...
    async getRightAnswer() {
        let rightAnswer = [...this.arrOfCurrentArtQues]

        rightAnswer = shuffle(rightAnswer)

        rightAnswer = rightAnswer[getRandomNum(0, 3)]
        this.numRightAnswer = rightAnswer
        console.log('this.numRightAnswer', this.numRightAnswer)

        let rightNameArtist = artistsJsonData[this.numRightAnswer]

        this.arrRightAnswerAllFromBase = rightNameArtist
        console.log(this.arrRightAnswerAllFromBase)

        this.rightAnswerAutor = rightNameArtist.author

        console.log('this.rightAnswerAutor = ', this.rightAnswerAutor)

    }

    async getCardQuestion() {
        console.log(this.array[this.number])

        let xxx = [...this.array[this.number]]
        console.log('this.numRightAnswer', this.numRightAnswer)

        console.log('---------перемешали ---')
        // xxx = shuffle(this.array[this.number])
        let xxx01 = checkArr(this.numRightAnswer, xxx, this.rightAnswerAutor, artistsJsonData)
        console.log(xxx01)
        xxx = shuffle(xxx01)
        console.log(xxx)


        let newDivCardQuestion = document.createElement("div");
        newDivCardQuestion.classList.add('newDivCardQuestion')

        artistQuiz.innerHTML += `
        <h3> Какую из 4-х картин написал ${this.rightAnswerAutor}?</h3>
        <p>вопрос № ${this.number + 1} из 10</p>
        `
        for (let i = 0; i < (this.array[this.number]).length; i++) {

            let x = xxx[i]

            newDivCardQuestion.innerHTML += `
                <div class="img-card" id="${x}">
                <img src="https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${x}.jpg" alt="img${x}">
                </div>
        `
        }

        artistQuiz.append(newDivCardQuestion)

        setTimeout(() => {
            artistQuiz.style.left = '0'
            let pageQuesImgs = document.querySelectorAll('.img-card')
            pageQuesImgs.forEach(item => {
                let resultCurrentAnswer
                item.addEventListener('click', () => {
                    console.log('countCurrentQuest', countCurrentQuest)
                    console.log(item.id, this.numRightAnswer)

                    let popUpResult = new PopResult(Number(item.id) === this.numRightAnswer, this.numRightAnswer, this.arrRightAnswerAllFromBase)
                    saveRightAnswer(Number(item.id) === this.numRightAnswer, this.numRightAnswer)


                    newDivCardQuestion.style.pointerEvents = 'none'
                    newDivCardQuestion.style.opacity = 0.75

                    popUpResult.result ? newDivCardQuestion.style.backgroundColor = 'green' : newDivCardQuestion.style.backgroundColor = 'red'
                    popUpResult.getShowResult()
                    saveScoreCategory(currentCategory, currentCategoryNumber, scoreCurrentStage)
                    console.log('***** Save scoreCurrentStage ***** ', 'scoreCurrentStage = ', scoreCurrentStage)

                    //todo сделать запись очков раунда
                    // console.log(this.numRightAnswer, Number(item.id) === this.numRightAnswer, currentCategoryNumber, currentCategory )
                    // // vvv[currentCategoryNumber] ? false : vvv[currentCategoryNumber] = {}
                    // vvv[this.numRightAnswer] = Number(item.id) === this.numRightAnswer
                    // console.log(vvv)
                    // Object.entries(vvv).forEach( item =>{
                    //     console.log(item[0])
                    //     console.log(item[1])
                    // })
                    // console.log('NOW ---------------------')

                    let resultCurrentAnswer = Number(item.id) === this.numRightAnswer
                    currentRoundScore(objCurrentRoundAnswers, this.numRightAnswer, resultCurrentAnswer )
                    console.log(objCurrentRoundAnswers)
                    // objCurrentRoundAnswers = currentRoundScore(this.numRightAnswer, resultCurrentAnswer )
                })

            })
        }, 1000)
    }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*****************
// карточка вопроса по картине
export class PictureQuestion extends ArtistQuestion {

    constructor(num, array) {
        super(num, array);
        // console.log('PictureQuestion')
        //num of category
        // this.number = Number(num)
        // console.log(this.number)
        //arr of selected category
        // this.array = array
        // console.log(this.array)
        //текущая база для текущего вопроса - 4картинки
        // this.arrOfCurrentArtQues = this.array[this.number]
        // console.log( this.arrOfCurrentArtQues)
        //правильное имя имя автора
        // this.rightAnswerAutor = ''
        // правильный номер ответа
        // this.numRightAnswer = ''
        // this.arrRightAnswerAllFromBase
        // this.rightAnswerimageNum = ''

    }

    //получаем номер правильного ответа и номер картинки для вывода/вопроса
    // и перемешиваем массив - для вывода на карточку вопроса - фамилий авторов
    async getRightAnswer() {
        super.getRightAnswer()
        let rightAnswer = shuffle([...this.arrOfCurrentArtQues])

        // rightAnswer = shuffle( rightAnswer) // перемешиваем массив
        // console.log('массив для ответа по картинке', rightAnswer )
        //
        // rightAnswer = rightAnswer[getRandomNum(0,3)]
        // this.numRightAnswer = rightAnswer
        // console.log( 'this.numRightAnswer', this.numRightAnswer)
        //
        // let rightNameArtist = artistsJsonData[this.numRightAnswer]
        // this.arrRightAnswerAllFromBase = rightNameArtist
        // console.log(this.arrRightAnswerAllFromBase)
        //
        // this.rightAnswerAutor = rightNameArtist.author
        // this.rightAnswerimageNum = rightNameArtist.imageNum
        // console.log(this.rightAnswerAutor)
        // console.log(this.rightAnswerimageNum)

    }

    async getCardQuestion() {

        console.log(this.array[this.number])
        //массив для запроса
        let xxx = [...this.array[this.number]]

        let xxx01 = checkArr(this.numRightAnswer, xxx, this.rightAnswerAutor, artistsJsonData)
        console.log(xxx01)
        xxx = shuffle(xxx01)

        // xxx = shuffle(this.array[this.number])
        console.log(xxx)

        let newMainPictureQuest = document.createElement("div");
        newMainPictureQuest.classList.add('newMainPictureQuest')

        let textQuestPicture = document.createElement("p");
        textQuestPicture.classList.add('textQuestPicture')
        textQuestPicture.innerHTML += `
            <div class ="quest-pic">
                <h3>Кто Автор этой картины?</h3>
                <p>вопрос № ${this.number + 1} из 10</p>
            </div>
        `
        newMainPictureQuest.append(textQuestPicture)

        let picture = new Image()
        picture.src = `https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${this.numRightAnswer}.jpg`
        picture.className = 'picture'
        newMainPictureQuest.append(picture)


        let newDivCardQuestion = document.createElement("div");
        newDivCardQuestion.classList.add('newDivCardQuestion')

        for (let i = 0; i < (this.array[this.number]).length; i++) {
            let x = xxx[i]
            console.log(artistsJsonData[x].author)
            newDivCardQuestion.innerHTML += `
                <div class="img-card picture-btn" id="${x}">
                <p>${artistsJsonData[x].author}</p>
                </div>
        `
        }

        newMainPictureQuest.append(newDivCardQuestion)

        artistQuiz.append(newMainPictureQuest)

        setTimeout(() => {
            artistQuiz.style.left = '0'
            let pageQuesImgs = document.querySelectorAll('.img-card')
            pageQuesImgs.forEach(item => {
                item.addEventListener('click', () => {
                    let resultCurrentAnswer = Number(item.id) === this.numRightAnswer
                    resultCurrentAnswer ? newMainPictureQuest.style.backgroundColor = 'green' : newMainPictureQuest.style.backgroundColor = 'red'
                    // resultCurrentAnswer ?
                    // countCurrentQuest+=1
                    // console.log('countCurrentQuest', countCurrentQuest)
                    console.log(item.id, this.numRightAnswer)

                    let popUpResult = new PopResult(resultCurrentAnswer, this.numRightAnswer, this.arrRightAnswerAllFromBase)

                    saveRightAnswer(Number(item.id) === this.numRightAnswer, this.numRightAnswer)

                    //todo now
                    currentRoundScore(objCurrentRoundAnswers, this.numRightAnswer, resultCurrentAnswer )
                    console.log(objCurrentRoundAnswers)

                    popUpResult.getShowResult()
                })
            })
        }, 1000)
    }
}

// роверка массива карточки вопроса - на дубликат
export function checkArr(rightN, arrayCurrent, rightAnswerAuthor, dataBase) {
    console.log('rightAnswerAuthor = ', rightAnswerAuthor)
    let arr = arrayCurrent.filter(function (item) {
        return item !== rightN
    })
    console.log(arr)
    let newArr = []
    arr.forEach(item => {
        console.log(rightAnswerAuthor, dataBase[item].author)
        if (rightAnswerAuthor === dataBase[item].author) {
            console.log('Дубликат')
            noDuplicate()

            function noDuplicate() {
                let newNum = getRandomNum(0, 120)
                console.log(newNum)
                if (dataBase[newNum].author === rightAnswerAuthor) {
                    console.log('СНОВА Дубликат')
                    noDuplicate()
                } else {
                    newArr.push(newNum)
                }
            }
        } else {
            newArr.push(item)
        }
    })
    console.log(newArr)
    newArr.push(rightN)
    return newArr
}

// наполняем объект objCurrentRoundAnswers - номером картинки и правильно/не правильно - при ответе текущего раунда
export function currentRoundScore(objCurrentRoundAnswers, numRightAnswer, result ) {
    objCurrentRoundAnswers[numRightAnswer] = result
}

// export function currentRoundScore(numRightAnswer, result ) {
//     let bufferNumAnswer = {}
//     bufferNumAnswer[numRightAnswer] = result
//     return bufferNumAnswer
// }

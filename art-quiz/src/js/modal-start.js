import '../css/modal-style.css'
import {getPushAudioPlay, startAudio} from "./audio";
import {getBaseFromLocalStorage} from "./database-local-store";


// запускает модальное окно - передаем блок для вставки на странице
export function startInfo(block, noTime){
    document.querySelector('body').prepend(block)
    let btnCloseModalInfo = document.querySelector('.btn-close-modal-info')
    btnCloseModalInfo.addEventListener('click', ()=>{
        getPushAudioPlay()
        document.querySelector('.temporary').remove()
    })
    if (noTime === 1){
        setTimeout( ()=>{
            btnCloseModalInfo.style.visibility = 'visible'
            btnCloseModalInfo.addEventListener( 'click', ()=>{
                let checkAudio = getBaseFromLocalStorage('audioOn')
                checkAudio ? startAudio.play() :  false
            })
        }, 1000)
    } else {
        setTimeout( ()=>{
            btnCloseModalInfo.style.visibility = 'visible'
        }, 0)
    }
}

// формируем блок для вставки - info - текст для информации в данном блоке
export function getModalBlock(info){
    let modalBlock = document.createElement('div')
    modalBlock.classList.add('temporary')
    modalBlock.innerHTML += `
        <div id="myModalBox" class="modal fade text-center in" style="display: block;">
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- Основное содержимое модального окна -->
              <div class="modal-body">
                <div>${info}</div>
              </div>
              <!-- Футер модального окна -->
              <div class="modal-footer">
                <button type="button" class="btn-close-modal-info " data-dismiss="modal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
    `
    return modalBlock
}

// инфо при старте
export let infoStartModal = `
    <p> .....Wait Please 10 seconds</p>
    <div class="overlay-loader">
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    
</div>
    <p> Смотри правила игры внизу страницы.</p>
`

//инфо правила
export let infoRulesModal = `
    <div class="rules-info">
        <p> Artist quiz - угадать картину Автора из 4-х картин.</p>
        <p> Pictures quiz - по картине угадать Автора.</p>
        <p> All Pictures Info - информация по всем картинам, угаданная картина показана цветной.</p>
        <p> All Author Pictures - получить все картины Автора.</p>
        <p>    ---------------------------------------------------</p>
        <p>Настройки "Шестеренка":</p>
        <p> - уровень звука;</p>
        <p>- включить/выключить звук;</p>
        <p>- Del Artists Score - удаляет очки викторины  Artist quiz;</p>  
        <p> - Del Pictures Score - удаляет очки викторины  Pictures quiz;</p>
        <p>- Reset All (New Game) ===> : При запуске игры формируется база вопросов по двум категориям и в дальнейшем при запуске игры эта база хранится в локал-сторе - этой клавишей можно удалить эту базу и пр старте новой игры будет сформировано случайным образом новая база вопросов</p>
        
    </div>
`
// инфа по картинке
export function infoPicsModal(arr, id) {
    return `
        <div class="infoPicsModal">
            <img src="https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${id}.jpg" alt="img${id}">
            <p>Автор: <i>${arr.author}</i></p>
            <p>Название: <i>${arr.name}</i></p>
            <p>Год: <i>${arr.year}</i></p>
            <p>*****************************</p>
        </div>
        `
}


//инфа по очкам
export function allScoresBlock(sum, arr, arr2) {
    let z = ''
    arr = Object.entries(arr)
    arr2 = Object.entries(arr2)

    z += `
        <h3 class="total-sum">Total Score = ${sum} points</h3>
    `

    let infoScores = document.createElement('div')
    infoScores.classList.add('infoScores')

    let infoScoresAuthors = document.createElement('div')
    infoScoresAuthors.classList.add('infoScoresAuthors')
    infoScoresAuthors.innerHTML+=`<p class="title-score">Artist quiz:</p>`

    arr.forEach( item =>{
        infoScoresAuthors.innerHTML += `
            <p>${item[0]} = ${item[1]} points;</p>
        `
    })

    let infoScoresPictures = document.createElement('div')
    infoScoresPictures.classList.add('infoScoresPictures')
    infoScoresPictures.innerHTML+=`<p class="title-score">Pictures quiz:</p>`

    arr2.forEach( item =>{
        infoScoresPictures.innerHTML+= `
             <p>${item[0]} = ${item[1]} points</p>
         `
    })

    infoScores.append(infoScoresAuthors)
    infoScores.append(infoScoresPictures)
    z += infoScores.outerHTML

    return z
}


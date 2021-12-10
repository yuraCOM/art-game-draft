// export let baseArtists = []
// export let basePictures = []


//фунция апдейт локал стор (название базы, данные что обновляем)
export function updateLocalStore(name, base){
    !localStorage.getItem(name) ? localStorage.setItem(name, JSON.stringify(base)) : false

}

// получаем данные из локал стор
export function getBaseFromLocalStorage (name){
    return JSON.parse(localStorage.getItem(name))
}


//сохраняем данные в локал стор
export function saveLocalStore(name, base){
    !localStorage.getItem(name) ? localStorage.setItem(name, JSON.stringify(base)) : localStorage.setItem(name, JSON.stringify(base))

}

//база угаданных картин
export function saveRightAnswer(result, num){
    let bufferSaveRightAnswers = getBaseFromLocalStorage('arrRightAnswer') || []
    if(result){
        !bufferSaveRightAnswers.includes(num) ? bufferSaveRightAnswers.push(num) : false
        saveLocalStore('arrRightAnswer', bufferSaveRightAnswers)
    }

}




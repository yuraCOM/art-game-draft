import {getBaseFromLocalStorage, saveLocalStore, updateLocalStore} from "./database-local-store";
import {DataArtistCategories, DataPictureCategories} from "./data";


export function saveScoreCategory(currentCategoryName, currentCategoryNumber, score) {
    // currentCategoryName = 'artistsBase' or 'picturesBase'
    // console.log(currentCategoryName, currentCategoryNumber, score  )
    // let data = getArrScoreFirst()
    // data[currentCategoryNumber] = score
    // updateLocalStore(`${currentCategoryName}`, data)

    if (currentCategoryName === 'artistsBase') {
        updateLocalStore('scoreArtistsBase', [])
        // let data = getArrScoreFirst()
        let data = getBaseFromLocalStorage('scoreArtistsBase') || []
        data[currentCategoryNumber] = score
        saveLocalStore('scoreArtistsBase', data)


    }
    if (currentCategoryName === 'picturesBase') {
        updateLocalStore('scorePicturesBase', [])
        let data = getBaseFromLocalStorage('scorePicturesBase') || []
        data[currentCategoryNumber] = score
        saveLocalStore('scorePicturesBase', data)
    }
}

//полуаем имя базы хранения очков игры
export function getScoreArr(name) {
    return name === 'artistsBase' ? 'scoreArtistsBase' : name === 'picturesBase' ? 'scorePicturesBase' : false
}


// очки по всей игре
///-----------
// export let scoreArtistsBase =  getBaseFromLocalStorage('scoreArtistsBase') || []
// export let scorePicturesBase = getBaseFromLocalStorage('scorePicturesBase') || []
// export let objAllScoreAuthors = {}
// export let objAllScorePictures = {}
// for (let i = 0; i < DataArtistCategories.length; i++) {
//     objAllScoreAuthors[DataArtistCategories[i]] = scoreArtistsBase[i] === undefined ? 0 :  scoreArtistsBase[i]
// }
// for (let i = 0; i < DataPictureCategories.length; i++) {
//     objAllScorePictures[DataPictureCategories[i]] = scorePicturesBase[i] === undefined ? 0 : scorePicturesBase[i]
// }
// export let sumAllScoreAuthors = Object.values(objAllScoreAuthors).reduce((a, b) => a + b)
// export let sumAllScorePictures = Object.values(objAllScorePictures).reduce((a, b) => a + b)
//---------------------

export function getAllScore() {

    let scoreArtistsBase =  getBaseFromLocalStorage('scoreArtistsBase') || []
    let scorePicturesBase = getBaseFromLocalStorage('scorePicturesBase') || []

    let objAllScoreAuthors = {}
    let objAllScorePictures = {}

    for (let i = 0; i < DataArtistCategories.length; i++) {
        objAllScoreAuthors[DataArtistCategories[i]] = scoreArtistsBase[i] === undefined || scoreArtistsBase[i] === null ? 0 :  scoreArtistsBase[i]
    }

    for (let i = 0; i < DataPictureCategories.length; i++) {
        objAllScorePictures[DataPictureCategories[i]] = scorePicturesBase[i] === undefined || scorePicturesBase[i] === null ? 0 : scorePicturesBase[i]
    }

    let sumAllScoreAuthors = Object.values(objAllScoreAuthors).reduce((a, b) => a + b)
    let sumAllScorePictures = Object.values(objAllScorePictures).reduce((a, b) => a + b)
    let sum = sumAllScoreAuthors + sumAllScorePictures

    return {
        'sum' : sum,
        'objAllScoreAuthors' : objAllScoreAuthors,
        'objAllScorePictures' : objAllScorePictures
    }

}

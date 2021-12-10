export let DataArtistCategories = ['Portrait', 'Landscape', 'Life', 'Graphic', 'Antique', 'Country', 'Renaissance', 'Surrealism', 'Kitsch', 'Minimalism', 'Post-Modern', 'Industrial' ]


export let DataPictureCategories = ['*01*', '*02*', '*03*', '*04*', '*05*', '*06*', '*07*', '*08*', '*09*', '*10*', '*11*', '*12*' ]


// получаем все картинки и формируем страницу с ними
export async function getAllPictures(base){
    let allPictures = document.createElement('div')
    allPictures.classList.add("all-pictures")

    for (let i = 0; i < base.length; i++) {
        allPictures.innerHTML += `
            <div class="prev-pic">
                <img class="preview-img" id=${i} src="https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${i}.jpg" loading="lazy" alt="${base[i].name}">
            </div>
        `
    }

    return allPictures
}

export  function getAllPicturesNEW(num) {
    let arrSrc = []
    for (let i = 0; i < num; i++){
        arrSrc.push([`https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${i}.jpg`, i])
    }
    console.log(arrSrc)

    let allPictures = document.createElement('div')
    allPictures.classList.add("all-pictures")
    for (let i = 0; i < 24; i++) {
        allPictures.innerHTML += `
            <div class="prev-pic">
                <img class="preview-img" id=${i} src=${arrSrc[i]} loading="lazy" alt="pic${[i]}">
            </div>
        `
    }
    return allPictures
}

//получить массив адресов картин - и это массив разбит на подмасивы по 24 картины
export function arrSrcAllPic(num, num2) {
    let x = []
    for (let i = 0; i <num;) {
        let y = []
        for (let j = 0; j < num2; j++) {
            i<=240 ?  y.push([`https://raw.githubusercontent.com/yuraCOM/image-data/master/img/${i}.jpg`, i]) : false
            i++
        }
    x.push(y)
    }
    console.log(x)
    return x
}

//todo
//сюда приходит массив с подмасивом array[0] array[0]
export function getPagePics(array, n) {
    console.log(array)

    let PicWrap = document.createElement('div')
    PicWrap.classList.add("pic-wrap")

    let btnPages = document.createElement('div')
    btnPages.classList.add("btn-page-pics")
    for (let i = 0; i < array.length; i++) {
        btnPages.innerHTML+=` 
            <p id="${i}" class="btn-page-pic ${i === n ? 'btn-search' : ''}">${i}</p>
        `
    }

    PicWrap.append(btnPages)

    let Pictures = document.createElement('div')
    Pictures.classList.add("all-pictures")
    for (let i = 0; i < array[n].length; i++) {
        Pictures.innerHTML += `
            <div class="prev-pic">
                <img class="preview-img" id=${(array[n][i])[1]} src=${(array[n][i])[0]} loading="lazy" alt="pic${[i]}">
            </div>
        `
    }
    PicWrap.append(Pictures)

    return [PicWrap, Pictures]
}


export function getArrScore() {
    let score = []
    for (let i = 0; i < 12; i++) {
        let i = []

        for (let j = 0; j < 10; j++) {

            i.push(0)
        }
        score.push([ [0], i ])
    }
    return score
}

export function getArrScoreFirst() {
    let score = []
    for (let i = 0; i < 12; i++) {
        score.push(0)
    }
    return score
}



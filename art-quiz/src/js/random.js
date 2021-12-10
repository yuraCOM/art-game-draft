// get random number
export function getRandomNum (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// массив рендом 240чисел
export function getAllQuestion() {
    let x = [];
    while (x.length < 240){
        let randomX = getRandomNum(1, 240)
        !x.includes(randomX) ?  x.push(randomX) :  randomX = getRandomNum(1, 240)
    }
    //240 рендом
    return x
}

//рендом массива заданной длины
export function getArrRandom(maxN, len) {
    let x = [];
    while (x.length < len){
        let randomX = getRandomNum(1, maxN)
        !x.includes(randomX) ?  x.push(randomX) :  randomX = getRandomNum(1, maxN)
    }
    //рендом n
    return x
}

//функция разбивает массив на заданные подмасивы
export function subArrs(src, count) {
    const result = [];
    for (let s = 0, e = count; s < src.length; s += count, e += count)
        result.push(src.slice(s, e));
    return result;
}


//функция получения массива на 12х10х4 - для 12 категорий по 10 в каждом и по 4 в каждом на выбор
export function data120() {
    let artists01 = getAllQuestion()
    let artists02 = getAllQuestion()
    artists01 =  subArrs(artists01, 4)
    artists02 =  subArrs(artists02, 4)

    return subArrs([...artists01, ...artists02], 10)
}

// перемешать
export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


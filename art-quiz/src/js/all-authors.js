
//array all name author
export async function getAllAuthors(data){

    let buffer = []
    data.forEach( item =>{
        !buffer.includes(item.author) ? buffer.push(item.author) : false
    })
    return buffer.sort()
}

// make page authors
export async function getPageAllAuthor(array) {
    let allAuthorsPage = document.createElement('div')
    allAuthorsPage.classList.add("all-authors")
    for (let i = 0; i < array.length; i++) {
        allAuthorsPage.innerHTML += `
            <p class="author-btn" loading="lazy" id=${i}>${array[i]}</p>`
        }
    return await allAuthorsPage
}

export function findPicAuthor(author, data) {
    let arrPic = []
    data.forEach(item =>{
        item.author === author ? arrPic.push(item.imageNum) : false
    })
    return arrPic

}


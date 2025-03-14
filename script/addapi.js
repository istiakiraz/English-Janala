const loadButton = ()=> {

    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayButton(data.data))
    .catch(error => console.log(error))

}

const displayButton = (button) => {
    console.log(button);

    const addButton = document.getElementById('learnBtn')

    for (let btn of button){
        const categoryDiv = document.createElement('div')

        categoryDiv.innerHTML = `
        <button class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png" alt="book-open"> Lesson - ${btn.level_no}</button>
        `
        addButton.appendChild(categoryDiv)
    }

}

loadButton()


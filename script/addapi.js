const showLoader = ()=>{

    document.getElementById('spiner').classList.remove('hidden')
    document.getElementById('wordCardBox').classList.add('hidden') 
}
const hideLoader = ()=>{
    document.getElementById('spiner').classList.add('hidden')
    document.getElementById('wordCardBox').classList.remove('hidden') 
}

const loadButton = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayButton(data.data))
        .catch(error => console.log(error))

}

const loadWord = (wordCard) => {

    showLoader()
    fetch(`https://openapi.programming-hero.com/api/level/${wordCard}`)
        .then(res => res.json())
        .then(data => displayWord(data.data))
}

const wordDetails = (wordId) =>{

    fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
    .then(res => res.json())
    .then(data=> displayWordDetails(data.data))
}



const displayWordDetails = (wordDetails) =>{
    // console.log(wordDetails.meaning.length);

    
    document.getElementById('word_details').showModal()

    const detailsContainer= document.getElementById('modal-details')

    detailsContainer.innerHTML =`
    
    <div id="modal-details" class="modal-box">
                    <div class="py-5 px-3 border-2 border-blue-100  rounded-xl">
                        <h1 class="font-bold text-3xl mb-7 " >${wordDetails.word} (:${wordDetails.pronunciation})</h1>
                        <h4 class="font-bold text-xl mb-2 " >Meaning</h4>
                        <p class="hind-siliguri-regular font-bold mb-7 " >${wordDetails.meaning} </p>
                        <h4 class="font-bold text-xl mb-2">Example</h4>
                        <p class="mb-7" >${wordDetails.sentence}</p>
                        <h4 class="hind-siliguri-regular font-bold mb-2" >সমার্থক শব্দ গুলো</h4>
                        <div>
                            <button class="btn bg-[#EDF7FF] text-gray-500 ">${wordDetails.synonyms[0]}</button>
                            <button class="btn bg-[#EDF7FF] text-gray-500">${wordDetails.synonyms[1]}</button>
                            <button class="btn bg-[#EDF7FF] text-gray-500">${wordDetails.synonyms[2]}</button>
                        </div>
                    </div>
                    <div>
                        <form method="dialog">
                            <button class="btn bg-[#422AD5] text-white mt-7 rounded-xl ">Complete Learning</button>
                        </form>
                    </div>
                </div>
    
    `



}


const displayWord = (words) => {

    const wordBox = document.getElementById('wordCardBox')
        wordBox.innerHTML = ""

        if (words.length === 0) {
            wordBox.innerHTML = `
            <div class="space-y-4 col-span-full items-center flex flex-col ">
                        <img src="assets/alert-error.png" alt="">
                        <p class="text-[#79716B] text-sm hind-siliguri-regular">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h1 class="text-3xl hind-siliguri-regular font-semibold">নেক্সট Lesson এ যান</h1>
                    </div>
            `
            hideLoader()
            return;
        }


    words.forEach(word => {

        const wordDiv = document.createElement('div')

        wordDiv.innerHTML = `
        
        <div class="p-16 bg-white rounded-xl space-y-8 h-[20rem]">
                    <div class="space-y-3">
                        <h1 class="font-bold text-2xl">${word.word}</h1>
                        <p class="text-xl">Meaning /Pronunciation</p>
                        <h2 class="hind-siliguri-regular text-gray-500 text-2xl font-bold">"${word.meaning}/ ${word.pronunciation}"</h2>
                    </div>

                    <div class="flex justify-between">
                        <div onclick=wordDetails(${word.id}) class="p-3 w-10 h-10 bg-blue-100 rounded-xl">
                            <img src="assets/info.png" alt="info icon">
                        </div>
                        <div class="p-3 w-10 h-10 bg-blue-100 rounded-xl"><img src="assets/sound.png" alt="sound icon"></div>
                    </div>
                </div>

        `
        wordBox.append(wordDiv)
    });

    hideLoader()

}



const displayButton = (button) => {


    const addButton = document.getElementById('learnBtn')

    for (let btn of button) {
        const categoryDiv = document.createElement('div')

        categoryDiv.innerHTML = `
        <button onclick="loadWord('${btn.level_no}')" class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png" alt="book-open"> Lesson - ${btn.level_no}</button>
        `
        addButton.appendChild(categoryDiv)
    }
    
}


loadButton()


const form = document.querySelector('form');
const synthesis = window.speechSynthesis;


const selects = document.querySelector('#slects');

let voices;

const options = () =>{

 voices = synthesis.getVoices();

for(let i = 0; i<voices.length; i++){
    const createOptions = document.createElement('option');
    createOptions.textContent = `${voices[i].name} - ${voices[i].lang}`


    if(voices[i].default){
        createOptions.textContent += ' -Default'
    }

    createOptions.setAttribute('data-lang', voices[i].lang)
    createOptions.setAttribute('data-name', voices[i].name)

    selects.appendChild(createOptions)
}



}

options();


if(speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = options;
}


//For Submit
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const textInput = document.querySelector('#text');

    const utter = new SpeechSynthesisUtterance(textInput.value)

    const selected = selects.selectedOptions[0].getAttribute('data-name');

    voices.forEach(voice => {
        if(voice.name === selected){
            utter.voice = voice;
        }
    });

 synthesis.speak(utter)
})


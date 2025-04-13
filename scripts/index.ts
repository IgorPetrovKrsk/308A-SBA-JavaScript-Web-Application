import * as RickAndMortyApi from "./rickAndMortyApi.js"
import { createCharacterCard } from "./characterCards.js";

const divCharacters = document.getElementById("divCharacters")

let btnGetRandomCharacter = document.getElementById(`btnRandom`);

if (btnGetRandomCharacter) { //because tipeScript thinks that button can be null (and he is right)
	btnGetRandomCharacter.addEventListener(`click`, getRandomCharacter);
}
async function getRandomCharacter(){
    const randomCharacterData = await RickAndMortyApi.fetchRandomCharacter();
    const randomCharacterCard = createCharacterCard(randomCharacterData);
    divCharacters.innerHTML = '';
    divCharacters.appendChild(randomCharacterCard);
    //console.log(randomCharacterData);
    
}

RickAndMortyApi.init();


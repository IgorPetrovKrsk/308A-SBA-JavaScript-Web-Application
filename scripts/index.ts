import * as RickAndMortyApi from "./rickAndMortyApi.js";
import * as CatApi from "./catApi.js";
import { createCharacterCard,Character } from "./characterCards.js";

export let isFavoritePage = false;

const divCharacters = document.getElementById("divCharacters")
const btnGetRandomCharacter = document.getElementById(`btnRandom`);
const btnSearchCharacters = document.getElementById(`btnSearch`);
const btnFavorites = document.getElementById(`btnFavorites`);
const selStatus = document.getElementById(`status`) as HTMLSelectElement;
const selGender = document.getElementById(`gender`) as HTMLSelectElement;
const inSearch = document.getElementById(`inSearch`) as HTMLInputElement;

if (btnGetRandomCharacter) { //because tipeScript thinks that button can be null (and he is right)
    btnGetRandomCharacter.addEventListener(`click`, getRandomCharacter);
}
if (btnSearchCharacters) {
    btnSearchCharacters.addEventListener(`click`, getCharactersByFilter);
}
if (btnFavorites){
    btnFavorites.addEventListener(`click`, getFavorites);
}

export async function getFavorites() {
    const characterList = await RickAndMortyApi.fetchCharactersByFavorites() as Character[];
    isFavoritePage = true;
    if (characterList.length === 0) {
        divCharacters.innerHTML = ` <img id="imgCharacter" src="images/Rick_and_Morty_not_found.png" width="300" alt="Image of not found">`;
    } else {
        divCharacters.innerHTML = '';
        characterList.forEach(it => {
            const character = createCharacterCard(it);
            divCharacters.appendChild(character);
        })
    }
}

async function getRandomCharacter() {
    isFavoritePage = false;
    const randomCharacterData = await RickAndMortyApi.fetchRandomCharacter();
    const randomCharacterCard = createCharacterCard(randomCharacterData);
    divCharacters.innerHTML = '';
    divCharacters.appendChild(randomCharacterCard);
}

async function getCharactersByFilter() {
    isFavoritePage = false;
    const characterList = await RickAndMortyApi.fetchCharactersByFilter(selStatus.value,selGender.value,inSearch.value) as Character[];
    if (characterList.length === 0) {
        divCharacters.innerHTML = ` <img id="imgCharacter" src="images/Rick_and_Morty_not_found.png" width="300" alt="Image of not found">`;
    } else {
        divCharacters.innerHTML = '';
        characterList.forEach(it => {
            const character = createCharacterCard(it);
            divCharacters.appendChild(character);
        })
    }
}



(function init() { //iife
    RickAndMortyApi.init(); //ASK Dylan in they will fire at the same time???
    CatApi.init();    
})();


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as RickAndMortyApi from "./rickAndMortyApi.js";
import * as CatApi from "./catApi.js";
import { createCharacterCard } from "./characterCards.js";
export let isFavoritePage = false;
const divCharacters = document.getElementById("divCharacters");
const btnGetRandomCharacter = document.getElementById(`btnRandom`);
const btnSearchCharacters = document.getElementById(`btnSearch`);
const btnFavorites = document.getElementById(`btnFavorites`);
const selStatus = document.getElementById(`status`);
const selGender = document.getElementById(`gender`);
const inSearch = document.getElementById(`inSearch`);
if (btnGetRandomCharacter) { //because tipeScript thinks that button can be null (and he is right)
    btnGetRandomCharacter.addEventListener(`click`, getRandomCharacter);
}
if (btnSearchCharacters) {
    btnSearchCharacters.addEventListener(`click`, getCharactersByFilter);
}
if (btnFavorites) {
    btnFavorites.addEventListener(`click`, getFavorites);
}
export function getFavorites() {
    return __awaiter(this, void 0, void 0, function* () {
        const characterList = yield RickAndMortyApi.fetchCharactersByFavorites();
        isFavoritePage = true;
        if (characterList.length === 0) {
            divCharacters.innerHTML = ` <img id="imgCharacter" src="images/Rick_and_Morty_not_found.png" width="300" alt="Image of not found">`;
        }
        else {
            divCharacters.innerHTML = '';
            characterList.forEach(it => {
                const character = createCharacterCard(it);
                divCharacters.appendChild(character);
            });
        }
    });
}
function getRandomCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        isFavoritePage = false;
        const randomCharacterData = yield RickAndMortyApi.fetchRandomCharacter();
        const randomCharacterCard = createCharacterCard(randomCharacterData);
        divCharacters.innerHTML = '';
        divCharacters.appendChild(randomCharacterCard);
    });
}
function getCharactersByFilter() {
    return __awaiter(this, void 0, void 0, function* () {
        isFavoritePage = false;
        const characterList = yield RickAndMortyApi.fetchCharactersByFilter(selStatus.value, selGender.value, inSearch.value);
        if (characterList.length === 0) {
            divCharacters.innerHTML = ` <img id="imgCharacter" src="images/Rick_and_Morty_not_found.png" width="300" alt="Image of not found">`;
        }
        else {
            divCharacters.innerHTML = '';
            characterList.forEach(it => {
                const character = createCharacterCard(it);
                divCharacters.appendChild(character);
            });
        }
    });
}
(function init() {
    RickAndMortyApi.init(); //ASK Dylan in they will fire at the same time???
    CatApi.init();
})();

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
import { createCharacterCard } from "./characterCards.js";
const divCharacters = document.getElementById("divCharacters");
let btnGetRandomCharacter = document.getElementById(`btnRandom`);
let btnSearchCharacters = document.getElementById(`btnSearch`);
if (btnGetRandomCharacter) { //because tipeScript thinks that button can be null (and he is right)
    btnGetRandomCharacter.addEventListener(`click`, getRandomCharacter);
}
if (btnSearchCharacters) {
    btnSearchCharacters.addEventListener(`click`, getCharactersByFilter);
}
function getRandomCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        const randomCharacterData = yield RickAndMortyApi.fetchRandomCharacter();
        const randomCharacterCard = createCharacterCard(randomCharacterData);
        divCharacters.innerHTML = '';
        divCharacters.appendChild(randomCharacterCard);
    });
}
function getCharactersByFilter() {
    return __awaiter(this, void 0, void 0, function* () {
        const characterList = yield RickAndMortyApi.fetchCharactersByFilter();
        console.log(characterList);
        if (characterList.length === 0) {
            divCharacters.innerHTML = ` <img id="imgCharacter" src="images/Rick_and_Morty_not_found.png" width="200" alt="Image of not found">`;
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
RickAndMortyApi.init();

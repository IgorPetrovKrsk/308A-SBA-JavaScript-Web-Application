import { favourite, isFavorite } from "./catApi.js";
export function createCharacterCard(CharacterData) {
    const template = document.querySelector("#characterTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
    const img = clone.querySelector("img");
    img.src = CharacterData.image;
    img.alt = `Rick and Morty character ${CharacterData.name}`;
    const charName = clone.querySelector("h3");
    charName.textContent = `Name: ${CharacterData.name}`;
    let nextSibling = charName.nextElementSibling;
    nextSibling.textContent = `Location: ${CharacterData.location.name}`;
    nextSibling = nextSibling.nextElementSibling;
    nextSibling.textContent = `Species: ${CharacterData.species}`;
    nextSibling = nextSibling.nextElementSibling;
    nextSibling.textContent = `Status: ${CharacterData.status}`;
    nextSibling = nextSibling.nextElementSibling;
    nextSibling.textContent = `Type: ${CharacterData.type}`;
    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", (ev) => {
        favourite(CharacterData.id.toString(), ev.currentTarget);
    });
    if (isFavorite(CharacterData.id.toString())) {
        favBtn.classList.add(`favourite-button-selected`);
    }
    return clone;
}

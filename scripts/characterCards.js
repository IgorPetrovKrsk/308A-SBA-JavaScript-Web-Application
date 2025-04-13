import { favourite } from "./rickAndMortyApi.js";
export function createCharacterCard(randomCharacterData) {
    const template = document.querySelector("#characterTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
    const img = clone.querySelector("img");
    img.src = randomCharacterData.image;
    img.alt = `Rick and Morty character ${randomCharacterData.name}`;
    const charName = clone.querySelector("h3");
    charName.textContent = `Name: ${randomCharacterData.name}`;
    let nextSibling = charName.nextElementSibling;
    nextSibling.textContent = `Location: ${randomCharacterData.location.name}`;
    nextSibling = nextSibling.nextElementSibling;
    nextSibling.textContent = `Species: ${randomCharacterData.species}`;
    nextSibling = nextSibling.nextElementSibling;
    nextSibling.textContent = `Status: ${randomCharacterData.status}`;
    nextSibling = nextSibling.nextElementSibling;
    nextSibling.textContent = `Type: ${randomCharacterData.type}`;
    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", (ev) => {
        favourite(randomCharacterData.id, ev.currentTarget);
    });
    return clone;
}

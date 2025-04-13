import { favourite } from "./rickAndMortyApi.js";
export function createCharacterCard(randomCharacterData) {
    const template = document.querySelector("#characterTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
    const img = clone.querySelector("img");
    img.src = randomCharacterData.image;
    img.alt = `Rick and Morty character ${randomCharacterData.name}`;
    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", (ev) => {
        favourite(randomCharacterData.id, ev.currentTarget);
    });
    return clone;
}

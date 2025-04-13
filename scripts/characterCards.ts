import {favourite} from "./rickAndMortyApi.js"

//interfaces for typescript
export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export function createCharacterCard(randomCharacterData: Character) {
    const template = document.querySelector("#characterTemplate") as HTMLTemplateElement;
    const clone = template.content.firstElementChild.cloneNode(true) as Element;

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

import {favourite,isFavorite} from "./catApi.js"

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

export function createCharacterCard(CharacterData: Character) {
    const template = document.querySelector("#characterTemplate") as HTMLTemplateElement;
    const clone = template.content.firstElementChild.cloneNode(true) as Element;

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
    console.log(isFavorite(CharacterData.id.toString());
    
    if (isFavorite(CharacterData.id.toString())){
        favBtn.classList.add(`favourite-button-selected`);
    }
    return clone;
}

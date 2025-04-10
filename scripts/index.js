"use strict";
let btnGetRandomCharacter = document.getElementById(`btnRandom`);
if (btnGetRandomCharacter) { //because tipeScript thinks that button can be null (and he is right)
    btnGetRandomCharacter.addEventListener(`click`, getRandomCharacter);
}
function getRandomCharacter() {
    alert(`test`);
}

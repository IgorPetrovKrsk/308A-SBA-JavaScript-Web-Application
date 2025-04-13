// @ts-ignore
import axios from "https://cdn.skypack.dev/axios";
const rickAndMortyAxios = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 5000,
  });

let charCount = 0; //number of characters from API

export async function init() { //inits for api
    try {

        let mainResponce = rickAndMortyAxios.get(`character`);
        mainResponce = await mainResponce;
        if (mainResponce.status === 200) {
            charCount = mainResponce.data.info.count;
        } else {
            console.error(`Error fetching data from Rick And Morty API`);

        }
    } catch (error) {
        console.error(error);

    }
}

export async function fetchRandomCharacter() {
    let randomCharacterNumber = Math.floor(Math.random() * charCount) + 1;
    let randomCharacterResponce = await rickAndMortyAxios.get(`character/${randomCharacterNumber}`);
    return randomCharacterResponce.data;
}

export async function fetchCharactersByFilter(status: string, gender: string, name: string) {
    let params: { [key: string]: string } = {};
    if (status.toLocaleLowerCase() !== `all`) {
        params[`status`] = status;
    }
    if (gender.toLocaleLowerCase() !== `all`) {
        params[`gender`] = gender;
    }
    if (name !== ``) {
        params[`name`] = name;
    }
    try {
        let charactersByFilter = await rickAndMortyAxios.get(`character`, { params });
        return charactersByFilter.data.results;
    } catch (error) {
        return []; //returning empty array as the result
    }
}
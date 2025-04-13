var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import axios from "https://cdn.skypack.dev/axios";
const rickAndMortyAxios = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 5000,
});
let charCount = 0; //number of characters from API
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mainResponce = rickAndMortyAxios.get(`character`);
            mainResponce = yield mainResponce;
            if (mainResponce.status === 200) {
                charCount = mainResponce.data.info.count;
            }
            else {
                console.error(`Error fetching data from Rick And Morty API`);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
export function fetchRandomCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        let randomCharacterNumber = Math.floor(Math.random() * charCount) + 1;
        let randomCharacterResponce = yield rickAndMortyAxios.get(`character/${randomCharacterNumber}`);
        return randomCharacterResponce.data;
    });
}
export function fetchCharactersByFilter(status, gender, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = {};
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
            let charactersByFilter = yield rickAndMortyAxios.get(`character`, { params });
            return charactersByFilter.data.results;
        }
        catch (error) {
            return []; //returning empty array as the result
        }
    });
}

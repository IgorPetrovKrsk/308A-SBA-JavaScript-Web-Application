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
const catAxios = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
    timeout: 5000,
});
const API_KEY = "live_UiYOtzJxYjaOcMznmcDsCQWt40ZtbTnzJfK79kFocCstrGVSPTv8rIMbVsmsuNz3"; //this is not really a good idea to store keys in the open
const USER_NAME = "Rick_and_Morty_user";
let favorites = []; // array to store img id of favorites
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let favResponse = yield catAxios.get(`favourites`, {
            headers: {
                "x-api-key": API_KEY
            },
            params: {
                attach_image: 0,
                sub_id: USER_NAME
            }
        });
        favorites = favResponse.data;
        console.log(`Favorites ${JSON.stringify(favorites[0])}`);
    });
}
export function favourite(id, target) {
    return __awaiter(this, void 0, void 0, function* () {
        //checking if the image is already in favorites or not
        let fav = favorites.find(it => it.id === id);
        // if (fav !== undefined) { //this image is already in favorites so delet
        //     try {
        //         await catAxios.delete(`favourites/${fav.id}`,
        //             // {
        //             //     "image_id": imgId,
        //             //     "sub_id": USER_NAME
        //             // },
        //             {
        //                 headers: {
        //                     "x-api-key": API_KEY
        //                 },
        //             }
        //         );
        //         favorites = favorites.filter(it => it.image.id !== imgId);
        //         target.classList.remove(`favourite-button-selected`);
        //         if (isFavoritePage) {
        //             axiosFavorites(USER_NAME); // repopulating the carousel
        //         }
        //     } catch (error) {
        //         console.error(`Error deleting favourite: ${error}`);
        //     }
        // } else { //adding
        try {
            let favId = yield catAxios.post(`favourites`, {
                "image_id": "" + id,
                "sub_id": USER_NAME
            }, {
                headers: {
                    "x-api-key": API_KEY
                },
            });
            favId = favId.data.id; // this is the Unique id of the favorite image (store it so that we can delet it)
            favorites.push({
                "id": favId,
                "image_id": id,
                "sub_id": USER_NAME
            });
            //target.classList.add(`favourite-button-selected`);
        }
        catch (error) {
            console.error(`Error adding favourite: ${error}`);
        }
        // }
    });
}
export function isFavorite(id) {
    return favorites.find(it => it.image_id === id);
}

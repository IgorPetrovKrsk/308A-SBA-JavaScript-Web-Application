// @ts-ignore
import axios from "https://cdn.skypack.dev/axios";
const catAxios = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
    timeout: 5000,
});

import {isFavoritePage,getFavorites} from "./index.js";

const API_KEY = "live_UiYOtzJxYjaOcMznmcDsCQWt40ZtbTnzJfK79kFocCstrGVSPTv8rIMbVsmsuNz3"; //this is not really a good idea to store keys in the open
const USER_NAME = "Rick_and_Morty_user";
export let favorites: { id: string, image_id: string, sub_id: string }[] = []; // array to store img id of favorites

export async function init() {


    let favResponse = await catAxios.get(`favourites`,
        {
            headers: {
                "x-api-key": API_KEY
            },
            params: {
                attach_image: 0,
                sub_id: USER_NAME
            }
        }
    );
    favorites = favResponse.data;
    // console.log(`Favorites ${JSON.stringify(favorites[0])}`);
}

export async function favourite(id: string, target: HTMLDivElement) {  //YES I'm using cat API to store favorites for Rick and Morty :-) (Because I can!!!!)
    //checking if the image is already in favorites or not
    let fav = favorites.find(it => it.image_id === id);
    if (fav !== undefined) { //this image is already in favorites so delete
        try {
            await catAxios.delete(`favourites/${fav.id}`,
                {
                    headers: {
                        "x-api-key": API_KEY
                    },

                }
            );
            favorites = favorites.filter(it => it.image_id !== id);
            target.classList.remove(`favourite-button-selected`);
            if (isFavoritePage) {
                getFavorites(); //reloading the favorites
            }
        } catch (error) {
            console.error(`Error deleting favourite: ${error}`);
        }
    } else { //adding
        try {
            let favId = await catAxios.post(`favourites`,
                {
                    "image_id": "" + id,
                    "sub_id": USER_NAME
                },
                {
                    headers: {
                        "x-api-key": API_KEY
                    },

                }
            );
            favId = favId.data.id; // this is the Unique id of the favorite image (store it so that we can delet it)
            favorites.push({ //just pushing new image to local favorites so that we should not get it again then displaing favorites
                "id": favId,
                "image_id": id,
                "sub_id": USER_NAME
            });
            target.classList.add(`favourite-button-selected`);
        } catch (error) {
            console.error(`Error adding favourite: ${error}`);
        }
    }

}

export function isFavorite(id: string) {
    return favorites.find(it => it.image_id === id);
}
// @ts-ignore
import axios from "https://cdn.skypack.dev/axios";

let charCount = 0; //number of characters from API

export async function init() { //inits for api
    axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';
    try {

        let mainResponce = axios.get(`character`);
        mainResponce = await mainResponce;
        if (mainResponce.status === 200) {
            charCount = mainResponce.data.info.count;
        } else {
            console.error(`Error fetching data from Rick And Morty API`);

        }
    } catch (error) {
        console.error(error);

    }


    //          let favResponse = axios.get(`favourites`,
    //             {
    //                 headers: {
    //                     "x-api-key": API_KEY
    //                 },
    //                 params: {
    //                     attach_image: 1,
    //                     sub_id: USER_NAME
    //                 }
    //             }
    //         );
    //         let response = axios({
    //             method: "GET",
    //             url: "breeds",
    //             onDownloadProgress: updateProgress
    //         });
    //         [favResponse, response] = await Promise.all([favResponse, response]); // promise.all to fetch cats and favorites at the same time in parallel
    //         favorites = favResponse.data; // storing favorites in the array
    //         if (response.status === 200) {
    //             breads = response.data;
    //         } else {
    //             throw new Error("Failed to fetch breeds");
    //         }
    //         breads.forEach(it => {
    //             let newOption = document.createElement("option");
    //             newOption.value = it.id;
    //             newOption.textContent = it.name;
    //             breedSelect.appendChild(newOption);
    //         });
    //         axiosBreed(breads[0]); // fetching first element and population carousel
    //     } catch (error) {
    //         console.error(`Error geting breads: ${error}`);
    //     }
    // })();
}




export async function fetchRandomCharacter() {
    let randomCharacterNumber = Math.floor(Math.random() * charCount) + 1;
    let randomCharacterResponce = await axios.get(`character/${randomCharacterNumber}`);
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
        let charactersByFilter = await axios.get(`character`, { params });
        return charactersByFilter.data.results;
    } catch (error) {
        return []; //returning empty array as the result
    }
}

export async function favourite(id: Number, target: EventTarget) {

    alert(`Favourite buttoc pushed at ${target} , and id ${id}`)
    //console.log(`Fav button clicked ${imgId}`);
    //checking if the image is already in favorites or not
    // let fav = favorites.find(it => it.image.id === imgId);
    // if (fav !== undefined) { //this image is already in favorites so delet
    //     try {
    //         await axios.delete(`favourites/${fav.id}`,
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
    //     try {
    //         let favId = await axios.post(`favourites`,
    //             {
    //                 "image_id": imgId,
    //                 "sub_id": USER_NAME
    //             },
    //             {
    //                 headers: {
    //                     "x-api-key": API_KEY
    //                 },

    //             }
    //         );
    //         favId = favId.data.id; // this is the Unique id of the favorite image (store it so that we can delet it)
    //         favorites.push({ //just pushing new image to local favorites so that we should not get it again then displaing favorites
    //             "id": favId,
    //             "image_id": imgId,
    //             "sub_id": USER_NAME,
    //             "image": { //this is `image` object
    //                 id: imgId,
    //                 url: `https://cdn2.thecatapi.com/images/${imgId}.jpg`
    //             }
    //         });
    //         target.classList.add(`favourite-button-selected`);
    //     } catch (error) {
    //         console.error(`Error adding favourite: ${error}`);
    //     }
    // }

}
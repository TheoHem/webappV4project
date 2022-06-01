import config from "../config/config.json";
import storage from "./storage";

const favourite = {
    saveStation: async function saveStation(station) {
        let token = await storage.readToken()
        const data = {
            api_key: config.auth_api_key,
            artefact: JSON.stringify(station)
        };
        const response = await fetch(`${config.auth_url}/data`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });
        const result = await response.json();
        return result;
    },
    getFavourites: async function getFavourites() {
        let token = await storage.readToken()
        const response = await fetch(`${config.auth_url}/data?api_key=${config.auth_api_key}`, {
            headers: {
                'x-access-token': token.token
            },
        });
        const result = await response.json();
        return result.data
    }
};

export default favourite;

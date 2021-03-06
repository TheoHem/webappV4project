import config from "../config/config.json";

const delay = {
    getDelays: async function getDelays() {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();
        return result.data;
    },
};

export default delay;

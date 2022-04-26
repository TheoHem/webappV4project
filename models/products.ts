import config from "../config/config.json";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    updateProduct: async function updateProduct(product) {
        let data = {
            id: product.id,
            name: product.name,
            stock: product.stock,
            api_key: config.api_key
        }

        await fetch(`${config.base_url}/products`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
    },
};

export default products;

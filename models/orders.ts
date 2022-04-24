import config from "../config/config.json";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    getSpecificProduct: async function getSpecificProduct(productId) {
        const response = await fetch(`${config.base_url}/products/${productId}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    checkStock: async function checkStock(order) {
        for (let element of order.order_items) {
            if (element.amount > element.stock) {
                return false;
            }
        }
        return true;
    },
    reduceStock: async function reduceStock(order) {
        let product;
        for (let element of order.order_items) {
            product = await this.getSpecificProduct(element.product_id);

            let data = {
                api_key: config.api_key,
                id: product.id,
                name: product.name,
                stock: element.stock - element.amount
            }
            
            await fetch(`${config.base_url}/products`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
    },
    setOrderStatus: async function setOrderStatus(order, status) {
        let data = {
            id: order.id,
            name: order.name,
            api_key: config.api_key,
            status_id: status
        }

        await fetch(`${config.base_url}/orders`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    pickOrder: async function pickOrder(order) {
        await this.reduceStock(order);
        await this.setOrderStatus(order, 200);
    }
};

export default orders;
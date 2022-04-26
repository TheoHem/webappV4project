import config from "../config/config.json";

const delivery = {
    addDelivery: async function addDelivery(delivery) {
        let data = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            comment: delivery.comment,
            delivery_date: delivery.delivery_date,
            api_key: config.api_key
        }
        console.log(data)

        await fetch(`${config.base_url}/deliveries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
    },
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    }
};

export default delivery;
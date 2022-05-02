import config from "../config/config.json";
import storage from "./storage";

const invoices = {
    getInvoices: async function getInvoices() {
        let token = await storage.readToken()
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
            'x-access-token': token.token
            },
        })
        const result = await response.json();

        return result.data
    },
    addInvoice: async function addInvoice(invoice, order) {
        let token = await storage.readToken()
        let dueDate = new Date();
        dueDate.setDate(invoice.due_date.getDate() + 30) 
        invoice.due_date = dueDate.toLocaleDateString('se-SV');

        function totalPrice(orderToSum) {
            let totalPrice = 0;
            orderToSum.order_items.forEach( item => {
                totalPrice += parseInt(item.price) * parseInt(item.amount)
            })
            return totalPrice
        }
        let currentTotalPrice = totalPrice(order);
        let data = {
            order_id: order.id,
            total_price: currentTotalPrice,
            api_key: config.api_key,
            creation_date: invoice.creation_date,
            due_date: invoice.due_date
        }
        const response = await fetch(`${config.base_url}/invoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token.token
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result)
    },
};

export default invoices;
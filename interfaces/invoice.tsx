export default interface Invoice {
    id: number;
    creation_date: string;
    due_date: string;
    order_id: number;
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    total_price: number;
}

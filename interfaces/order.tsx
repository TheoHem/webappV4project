export default interface Order {
    address: string;
    city: string;
    country: string;
    id: number;
    name: string;
    order_items: [index: number]
    status: string;
    status_id: number;
    stock: number;
}

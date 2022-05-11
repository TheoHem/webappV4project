import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const deliveries = [
    { product_name: "Glas", amount: 2, delivery_date: "2022-01-02", comment: "Kommentar" },
    { product_name: "Tallrik", amount: 10, delivery_date: "2022-03-12", comment: "Kommentar" },
    { product_name: "Bestick", amount: 43, delivery_date: "2022-06-24", comment: "Kommentar" },
];

const setDeliveries = () => false;

test('List should contain three items', async () => {
    const { getByText } = render(<DeliveriesList deliveries={deliveries} setDeliveries={setDeliveries} />);

    const shampoo = await getByText('Glas', { exact: false });
    const tallrik = await getByText('Tallrik', { exact: false });
    const bestick = await getByText('Bestick', { exact: false });

    expect(shampoo).toBeDefined();
    expect(tallrik).toBeDefined();
    expect(bestick).toBeDefined();
});
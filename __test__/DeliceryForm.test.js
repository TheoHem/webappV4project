import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

const setProducts = () => false;
const setDeliveries = () => false;

test('List should contain three items', async () => {
    const { getByText, debug } = render(< DeliveryForm  setProducts={setProducts} setDeliveries={setDeliveries} />);
    const formHeaders = ['PRODUKT', 'DATUM', 'KOMMENTAR', 'ANTAL']
    formHeaders.forEach(async (formHeader) => {
        const header = await getByText(formHeader);
        expect(header).toBeDefined();
    })
});
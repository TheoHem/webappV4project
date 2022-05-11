import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

const setProducts = () => false;
const setDeliveries = () => false;

test('Form should have four headres named PRODUKT, DATUM, KOMMENTAR and ANTAL', async () => {
    const { getByText, debug } = render(< DeliveryForm  setProducts={setProducts} setDeliveries={setDeliveries} />);
    const formHeaders = ['PRODUKT', 'DATUM', 'KOMMENTAR', 'ANTAL']
    formHeaders.forEach(async (formHeader) => {
        const header = await getByText(formHeader);
        expect(header).toBeDefined();
    })
});
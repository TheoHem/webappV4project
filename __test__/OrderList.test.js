import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';

const route = {
    params: 1
}

test('header should exist containing text Ordrar redo att plockas', async () => {
    const { getByText, debug } = render(<OrderList route={route} />);
    //debug("Orderlist component");
    const header = await getByText('Ordrar redo att plockas');
    expect(header).toBeDefined();
});
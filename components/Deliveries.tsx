import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
            {(screenProps) => <DeliveriesList {...screenProps} deliveries={props.deliveries} setDeliveries={props.setDeliveries} />}
            </Stack.Screen>
            <Stack.Screen name="Form">
            {(screenProps) => <DeliveryForm {...screenProps} deliveries={props.deliveries} setDeliveries={props.setDeliveries} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TextInput } from 'react-native';
import { Base, Typography, Forms } from '../styles';
import DelayList from './DelayList.tsx'
import DelayMap from './DelayMap.tsx'
import Logout from './auth/Logout.tsx'

const Stack = createNativeStackNavigator();

export default function Delay(props) {
    return (
        <Stack.Navigator
            initialRouteName="Förseningar">
            <Stack.Screen
                name="Förseningar"
            >
                {(screenProps) => <DelayList {...screenProps} delays={props.delays} setDelays={props.setDelays} />}
            </Stack.Screen>
            <Stack.Screen name="Karta" component={DelayMap} />
            <Stack.Screen name="Logga ut">
                {(screenProps) => <Logout {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

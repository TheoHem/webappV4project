import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavouriteList from './FavouriteList.tsx'
import FavouriteAdd from './FavouriteAdd.tsx'
import Logout from "./auth/Logout.tsx";

const Stack = createNativeStackNavigator();

export default function Favourite(props) {
    const [favourites, setFavourites] = useState([]);
    return (
        <Stack.Navigator initialRouteName="Dina Favoriter">
            <Stack.Screen name="Dina Favoriter">
                {(screenProps) => <FavouriteList {...screenProps} delays={props.delays} setDelays={props.setDelays} favourites={favourites} setFavourites={setFavourites} />}
            </Stack.Screen>
            <Stack.Screen name="Lägg till">
                {(screenProps) => <FavouriteAdd {...screenProps} favourites={favourites} setFavourites={setFavourites} />}
            </Stack.Screen>
            
            <Stack.Screen name="Logga ut">
                {(screenProps) => <Logout {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

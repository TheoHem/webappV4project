import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Typography } from '../styles';
import OrderModel from '../models/orders';

export default function ShipList({ route, navigation }) {
    const [readyToShip, setReadyToShip] = useState([]);
    useEffect(async () => {
        setReadyToShip(await OrderModel.getOrders());
    }, []);

    const listOfOrdersToShip = readyToShip
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Ship', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style={Typography.header2}>Ordrar redo att skickas</Text>
            {listOfOrdersToShip}
        </View>
    );
}
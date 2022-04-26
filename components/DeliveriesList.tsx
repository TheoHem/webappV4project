import { Text, Button, ScrollView} from 'react-native';
import { Base, Typography } from '../styles';
import { useState, useEffect} from 'react';
import deliveryModel from "../models/delivery";

export default function List({navigation, deliveries, setDeliveries}) {
    useEffect(async () => {
        setDeliveries(await deliveryModel.getDeliveries());
    }, []);
    
    const listOfDeliveries = deliveries.map((item, index) => {
        return <Text
                style={Typography.normal}
                key={index}
                >
                    {item.product_name} - {item.amount}st{"\n"}
                    Leverans: {item.delivery_date}{"\n"}
                    Kommentar: {item.comment}
                </Text>;
    });

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}

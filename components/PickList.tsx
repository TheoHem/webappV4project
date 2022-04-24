import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        if (await orderModel.checkStock(order)) {
            await orderModel.pickOrder(order);
            setProducts(await productModel.getProducts());
            navigation.navigate("List", { reload: true });
        } else {
            console.log("All not in stock")
        }
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                style={Typography.normal}
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
                </Text>;
    });

    function PickButton() {
        let testVar = true;
        for (let element of order.order_items) {
            console.log(element)
            if (element.amount > element.stock) {
                testVar = false;
            }
        }

        if (testVar) {
            return (
                <Button title="Plocka order" onPress={pick} />
            );
        } else {
            return (
                <Text style={Base.errorText}>För få produkter i lager</Text>
            );
        }
    }

    return (
        <View>
            <Text style={Base.header3}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Base.header3}>Produkter:</Text>

            {orderItemsList}

           <PickButton></PickButton>
        </View>
    )
};
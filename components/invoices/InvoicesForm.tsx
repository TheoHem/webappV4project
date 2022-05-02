import { View, Text, TextInput, Button, Picker } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataTable } from "react-native-paper";
import Order from '../../interfaces/order';
import Invoice from '../../interfaces/invoice';

import OrderModel from '../../models/orders';
import InvoiceModel from '../../models/invoices';

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setOrders(await OrderModel.getOrders());
    }, []);

    const itemsList = orders.map((order, index) => {
        productsHash[order.id] = order;
        if (order.status_id < 600) {
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        }
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
                props.setCurrentOrder(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };
    
    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: date.toLocaleDateString('se-SV'),
                            due_date: date
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}



export default function Invoices({navigation, invoices, setInvoices}) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});


    async function addInvoice() {
        await InvoiceModel.addInvoice(invoice, currentOrder);
        await OrderModel.setOrderStatus(currentOrder, 600);
        await setInvoices(await InvoiceModel.getInvoices());
    }

    return (
        <View>
            <Text style={Typography.header2}>Ny Faktura</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />
            <Text style={{ ...Typography.label }}>DATUM</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    addInvoice()
                    navigation.navigate('List');
                }}
            />
        </View>
    );
};
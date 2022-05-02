import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { Typography, Forms, Base } from '../../styles';

import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";

import AuthModel from '../../models/auth'
import OrderModel from '../../models/orders';
import InvoiceModel from '../../models/invoices';

//setIsLoggedIn={setIsLoggedIn}

export default function Invoices({navigation, invoices, setInvoices, setIsLoggedIn}) {
    useEffect(async () => {
        setInvoices(await InvoiceModel.getInvoices());
    }, []);

    async function logOut() {
        await AuthModel.logout();
        setIsLoggedIn(false);
    }

    function InvoicesTable() {
        const table = invoices.map((invoice, index) => {
            return (
                <DataTable.Row>
                  <DataTable.Cell>{invoice.name}</DataTable.Cell>
                  <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
                  <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                </DataTable.Row>
            );
        });
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>pris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {table}
            </DataTable>
        )
    }
    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={Typography.header2}>Fakturor</Text>
            <InvoicesTable></InvoicesTable>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Button
                title="Logga ut"
                onPress={() => {
                    logOut();
                    navigation.navigate('Lager');
                }}
            />
        </ScrollView>
    );
};
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from '../assets/warehouse.jpg';
import Stock from '../components/Stock.tsx';
import { Base, Typography } from '../styles';


export default function Home({products, setProducts}) {
    return (
        <ScrollView style={styles.base}>
            <Text style={Base.header1}>Lager-Appen</Text>
            <Image source={warehouse} style={{ width: 320, height: 240, marginBottom: 28 }} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
  }
});

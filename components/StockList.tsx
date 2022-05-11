import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import productModel from "../models/products.ts";

export default function StockList({products, setProducts}) {
  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, []);

  const list = products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typography.normal }}
            >
              { product.name } - { product.stock }
            </Text>
  });
  return (
    <View>
      {list}
    </View>
  );
}

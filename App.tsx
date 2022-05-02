import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx";
import Auth from "./components/auth/Auth.tsx";
import Invoices from "./components/invoices/Invoices.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import config from "../config/config.json";
import productModel from "./models/products.ts";
import AuthModel from './models/auth';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleverans": "car",
  "Logga in": "key",
  "Faktura": "cash",
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  /*
  useEffect(async () => {
    setIsLoggedIn(await AuthModel.loggedIn());
  }, []);
  */
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Lager">
          {() => <Home products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Plock">
          {() => <Pick products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Inleverans">
          {() => <Deliveries deliveries={deliveries} setDeliveries={setDeliveries} setProducts={setProducts} />}
        </Tab.Screen>
        {isLoggedIn ?
          <Tab.Screen name="Faktura">
            {() => <Invoices invoices={invoices} setInvoices={setInvoices} setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen> :
          <Tab.Screen name="Logga in">
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        }

        
    </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
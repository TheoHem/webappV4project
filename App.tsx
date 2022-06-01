import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import config from "../config/config.json";
import { Base, Typography, Forms } from './styles';

import Delay from "./components/Delay.tsx";
import Favourite from "./components/Favourite.tsx"
import Auth from "./components/auth/Auth.tsx";

import AuthModel from './models/auth';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Försening": "train",
  "Favoriter": "heart",
  "Plock": "list",
  "Inleverans": "car",
  "Logga in": "person",
  "Faktura": "cash",
  "Leverans": "map",
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [delays, setDelays] = useState([]);
  
  /*
  useEffect(async () => {
    setIsLoggedIn(true);
  }, []);


  screenOptions={{
                header: ({route}) => <Text>Hello</Text>
            }}
  */
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            header: ({route}) => {
              return <Text style={Base.base}></Text>
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Försening">
            {() => <Delay delays={delays} setDelays={setDelays} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
          </Tab.Screen>
          {isLoggedIn ?
          <Tab.Screen name="Favoriter">
            {() => <Favourite delays={delays} setDelays={setDelays} setIsLoggedIn={setIsLoggedIn}/>}
          </Tab.Screen>:
          <Tab.Screen name="Logga in">
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
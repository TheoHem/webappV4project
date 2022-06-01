import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TextInput, View, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import { Base, Typography, Forms } from '../../styles';
import DelayList from './DelayList.tsx'
import DelayMap from './DelayMap.tsx'
import { Ionicons } from '@expo/vector-icons';
import AuthModel from '../../models/auth';
import { useState } from 'react';

export default function Logout({navigation, setIsLoggedIn}) {

    async function logOut() {
        await AuthModel.logout()
        setIsLoggedIn(false)
        navigation.navigate("Försening")
    }

    return (
            <View style={[styles.container, {
                flexDirection: "column"
            }]}>
                <View style={{ flex: 1, backgroundColor: "white " }}>
                    <Text style={{textAlign: "center", marginTop: 25}}><Ionicons name={"person"} size={100} color={"gray"} /></Text>
                    <Text style={{textAlign: "center", fontSize: 20}}> Användarnamn</Text>
                </View>
                <View style={{ flex: 2, backgroundColor: "#F1F1F1" }}>

                    <Text style={Typography.label}>{'\n'}Genvägar</Text>
                    <Pressable
                        style={styles.button}   
                        onPress={() => {
                            navigation.navigate("Försening")
                        }}>
                        <Text><Ionicons name={"home"} size={20} color={"gray"} />   Startsida</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate("Dina Favoriter")
                        }}>
                        <Text><Ionicons name={"heart"} size={20} color={"gray"} />   Favoriter</Text>
                    </Pressable>
                    <Text>{'\n'}</Text>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            logOut();
                        }}>
                        <Text>Logga ut</Text>
                    </Pressable>
                </View>

            </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    base: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12,
    },
    button: {
        //alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        paddingHorizontal: 32,
        //borderRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
    },
});

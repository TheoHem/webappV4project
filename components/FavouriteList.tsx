import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button, StyleSheet, Image } from 'react-native';
import { Base, Typography, Forms } from '../styles';
import favouriteModel from "../models/favourite.ts"
import trains from '../assets/trains.jpg'

export default function FavouriteList({navigation, route, delays, setDelays, favourites, setFavourites }) {
    useEffect(async () => {
        setFavourites(await favouriteModel.getFavourites());
    }, []);
    
    const favouritesList = favourites.map((station, index) => {
        let stationObj = JSON.parse(station.artefact)
        let estArrivalDate;
        let estArrivalTime;
        let counter = 0;
        
        const favouriteDelay = delays.map((delay, index) => {
            let toLocation;
            if (delay.ToLocation) {
                toLocation = delay.ToLocation[0].LocationName;
            }

            if (delay.EstimatedTimeAtLocation) {
                estArrivalDate = new Date(delay.EstimatedTimeAtLocation);
                estArrivalTime = estArrivalDate.toLocaleTimeString('se-SV');
                estArrivalDate = estArrivalDate.toLocaleDateString('se-SV');
            }

            if (toLocation === stationObj.LocationSignature) {
                counter++;
                return <Text
                        key={index}
                        style={{ ...Typography.normalGray }}
                        >
                            Tåg {delay.AdvertisedTrainIdent} är försenat till {'\n'}
                            {estArrivalDate} {estArrivalTime}{'\n\n'}
                        </Text>

                
            }
        })
        
        return <View key={index} style={[styles.container, {
                    flexDirection: "row"
                }]}>
                    <Image source={trains} style={{width: 100, height: 100, marginBottom: 5, marginTop: 10, marginRight: 10 }} />
                    <View style={{marginTop: 10}}>
                        <Text style={{ ...Typography.normal }}>
                                <Text style={Typography.header4}>{stationObj.AdvertisedLocationName}{'\n'}</Text>
                            {favouriteDelay}
                        </Text>
                    </View>
                </View>
                
    });

    return (
        <ScrollView style={styles.base}>
            <Button
            title={"Lägg till favorit"}
            onPress={() => {
                navigation.navigate('Lägg till', {
                });
            }}
            />
            <Button
            title={"Konto"}
            onPress={() => {
                navigation.navigate('Logga ut', {
                });
            }}
            />
            {favouritesList}
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

import { Text, View, Button, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';

import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import stationModel from "../models/station.ts"

export default function DelayMap({route}) {
    const {station} = route.params
    const {date}  = route.params
    const {time} = route.params
    const {delay} = route.params
    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);
    const [region, setRegion] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        (async () => {
            const result = await stationModel.getLocation(station);
            let setTitle = `${station} - ${time}`
            setMarker(<Marker
                coordinate={{ latitude: result.lat, longitude: result.lon }}
                title={setTitle}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await stationModel.getLocation(station);
            let temp = {
                latitude: result.lat,
                longitude: result.lon,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }
            setRegion(temp);
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            const result = await stationModel.getLocation(station);
            setCircle(<Circle
                radius={getDistance(delay)}
                fillColor={'rgba(39, 148, 245, 0.3)'}
                center={{
                    latitude: result.lat,
                    longitude: result.lon
                }}>
            </Circle>);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function getDistance(delay) {
        let now = new Date();
        let delayTime = new Date(delay.EstimatedTimeAtLocation);
        let diff = Math.abs(now - delayTime);
        let minutes = (diff / 60000) - 5;
        if (minutes < 0 ) {
            minutes = 0;
        }
        return minutes * 50 
    }

    return (
        <View style={Base.base}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={region}>
                    {marker}
                    {locationMarker}
                    {circle}
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


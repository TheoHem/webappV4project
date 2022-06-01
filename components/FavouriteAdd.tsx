import { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Button, Picker, Platform, View, StyleSheet } from "react-native";
import { Base, Typography, Forms } from '../styles';
import Station from '../interfaces/station';

import stationModel from "../models/station.ts"
import favouriteModel from "../models/favourite.ts"

function StationDropDown(props) {
  const [stations, setStations] = useState<Station[]>([]);
  let stationsHash: any = {};

  useEffect(async () => {
      setStations(await stationModel.getStations());
  }, []);

  const stationsList = stations.map((station, index) => {
    stationsHash[station.LocationSignature] = station;
      return <Picker.Item key={index} label={station.AdvertisedLocationName} value={station.LocationSignature} />;
  });

  return (
      <Picker
          selectedValue={props.currentStation?.LocationSignature}
          onValueChange={(itemValue) => {
              props.setCurrentStation(stationsHash[itemValue]);
          }}>
          {stationsList}
      </Picker>
  );
}

export default function FavouriteAdd({navigation, route, favourites, setFavourites}) {
    const [currentStation, setCurrentStation] = useState<Partial<Station>>({});

    async function addFavourite() {
      await favouriteModel.saveStation(currentStation);
      setFavourites(await favouriteModel.getFavourites())
      navigation.navigate("Dina Favoriter", { reload: true })
    }

    return (
        <ScrollView style={styles.base}>
            <StationDropDown
              currentStation={currentStation}
              setCurrentStation={setCurrentStation}
            />
            <Button
                title="Lägg till"
                onPress={() => {
                  addFavourite();
                }}
            />
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

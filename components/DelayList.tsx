import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button, StyleSheet, TextInput, Picker, Image} from 'react-native';
import { Base, Typography, Forms } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import delayModel from "../models/delay.ts"
import stationModel from "../models/station.ts"
import trains from '../assets/trains.jpg'

export default function DelayList({delays, setDelays, navigation, route}) {
    const [stations, setStations] = useState([]);
    const [nameToSig, setNameToSig] = useState([]);
    const [filter, setFilter] = useState([]);
    const [filterDrop, setFilterDrop] = useState([]);

    useEffect(async () => {
        setDelays(await delayModel.getDelays());
        setStations(await stationModel.getStations());
        setNameToSig(await stationModel.nameToSig());
    }, []);

    let fromLocation;
    let toLocation;
    let ordArrivalDate;
    let ordArrivalTime;
    let estArrivalDate;
    let estArrivalTime;
    let canceled = false;
    
    let list;
    if (filter[0]) {
        list = delays
        .filter(delay => delay.AdvertisedTrainIdent === filter)
        .map((delay, index) => {
            if (delay.FromLocation) {
                fromLocation = nameToSig[delay.FromLocation[0].LocationName]
            }

            if(delay.ToLocation) {
                toLocation = nameToSig[delay.ToLocation[0].LocationName]
            }
            
            if (delay.AdvertisedTimeAtLocation) {
            ordArrivalDate = new Date(delay.AdvertisedTimeAtLocation);
            ordArrivalTime = ordArrivalDate.toLocaleTimeString('se-SV');
            ordArrivalDate = ordArrivalDate.toLocaleDateString('se-SV');
            }

            if (delay.EstimatedTimeAtLocation) {
                estArrivalDate = new Date(delay.EstimatedTimeAtLocation);
                estArrivalTime = estArrivalDate.toLocaleTimeString('se-SV');
                estArrivalDate = estArrivalDate.toLocaleDateString('se-SV');
            }

            return  <View key={index}>
                        <View style={Base.delayCard} >
                            <Text
                            style={{ ...Typography.normal }}
                            >
                            <Text style={Typography.header4}>Tåg { delay.AdvertisedTrainIdent } {'\n'}</Text>
                            <Text style={Typography.header4}>Från { fromLocation } {'\n'}Till { toLocation } {'\n'}</Text>
                            { !delay.Canceled ?
                                <Text>
                                    <Text style={Typography.header4}>Ordinare ankomst: {'\n'}</Text>
                                    { ordArrivalDate } { ordArrivalTime } {'\n'}
                                    <Text style={Typography.header4}>Beräknad ankomst: {'\n'} </Text>
                                    { estArrivalDate } { estArrivalTime } {'\n'}
                                    <Button
                                    title={"Karta"}
                                    onPress={() => {
                                        let sendFromLocation;
                                        let sendEstArrDate;
                                        let sendEstArrTime;
                                        if (delay.FromLocation) {
                                            sendFromLocation = nameToSig[delay.FromLocation[0].LocationName]
                                        }
                                        if (delay.EstimatedTimeAtLocation) {
                                            sendEstArrDate = new Date(delay.EstimatedTimeAtLocation);
                                            sendEstArrTime = sendEstArrDate.toLocaleTimeString('se-SV');
                                            sendEstArrDate = sendEstArrDate.toLocaleDateString('se-SV');
                                        }
                                        navigation.navigate('Karta', {
                                            station: sendFromLocation,
                                            date: sendEstArrDate,
                                            time: sendEstArrTime,
                                            delay: delay
                                        });
                                    }}
                                    />
                                </Text>
                                :
                                <Text style={Typography.canceled}>Är Inställt</Text>
                            }
                            </Text>
                        </View>
                    </View>
        });
    } else {
        list = delays
        .map((delay, index) => {
            if (delay.FromLocation) {
                fromLocation = nameToSig[delay.FromLocation[0].LocationName]
            }

            if(delay.ToLocation) {
                toLocation = nameToSig[delay.ToLocation[0].LocationName]
            }
            
            if (delay.AdvertisedTimeAtLocation) {
            ordArrivalDate = new Date(delay.AdvertisedTimeAtLocation);
            ordArrivalTime = ordArrivalDate.toLocaleTimeString('se-SV');
            ordArrivalDate = ordArrivalDate.toLocaleDateString('se-SV');
            }

            if (delay.EstimatedTimeAtLocation) {
                estArrivalDate = new Date(delay.EstimatedTimeAtLocation);
                estArrivalTime = estArrivalDate.toLocaleTimeString('se-SV');
                estArrivalDate = estArrivalDate.toLocaleDateString('se-SV');
            }

            return  <View key={index}>
                        <View style={Base.delayCard} >
                            <Text
                            style={{ ...Typography.normal }}
                            >
                            <Text style={Typography.header4}>Tåg { delay.AdvertisedTrainIdent } {'\n'}</Text>
                            <Text style={Typography.header4}>Från { fromLocation } {'\n'}Till { toLocation } {'\n'}</Text>
                            { !delay.Canceled ?
                                <Text>
                                    <Text style={Typography.header4}>Ordinare ankomst: {'\n'}</Text>
                                    { ordArrivalDate } { ordArrivalTime } {'\n'}
                                    <Text style={Typography.header4}>Beräknad ankomst: {'\n'} </Text>
                                    { estArrivalDate } { estArrivalTime } {'\n'}
                                    <Button
                                    title={"Karta"}
                                    onPress={() => {
                                        let sendFromLocation;
                                        let sendEstArrDate;
                                        let sendEstArrTime;
                                        if (delay.FromLocation) {
                                            sendFromLocation = nameToSig[delay.FromLocation[0].LocationName]
                                        }
                                        if (delay.EstimatedTimeAtLocation) {
                                            sendEstArrDate = new Date(delay.EstimatedTimeAtLocation);
                                            sendEstArrTime = sendEstArrDate.toLocaleTimeString('se-SV');
                                            sendEstArrDate = sendEstArrDate.toLocaleDateString('se-SV');
                                        }
                                        navigation.navigate('Karta', {
                                            station: sendFromLocation,
                                            date: sendEstArrDate,
                                            time: sendEstArrTime,
                                            delay: delay
                                        });
                                    }}
                                    />
                                </Text>
                                :
                                <Text style={Typography.canceled}>Är Inställt</Text>
                            }
                            </Text>
                        </View>
                    </View>
        });
    }

    function FilterDropDown() {
        let choices = ["Visa Allt", "Tåg", "Avgående", "Ankommande"]
        const choiceList = choices.map((choice, index) => {
              return <Picker.Item key={index} label={choice} value={choice} />;
          });
        return (
            <Picker
                selectedValue={filterDrop}
                onValueChange={(itemValue) => {
                    setFilterDrop(itemValue);
                    console.log(filterDrop)
                }}>
                {choiceList}
            </Picker>
        );
    }


    return (
        <ScrollView style={styles.base}>
            <Image source={trains} style={{width: "100%", height: 100, marginBottom: 5, marginTop: 10, borderRadius: 10 }} />
            <View style={Forms.searchSection}>
                <Text style={Forms.searchIcon}><Ionicons style={Forms.searchIcon} name={"search"} size={25} color={"#000"} /></Text>
                <TextInput
                    style={{ ...Forms.input }}
                    placeholder="Tågnummer"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    onChangeText={(content: string) => {
                        setFilter(content)
                    }}
                />
            </View>
            { list }
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
    },
  });

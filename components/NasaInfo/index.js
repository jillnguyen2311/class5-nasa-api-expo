import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import { Box, Text, ScrollView, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config"

export default function NasaInfo() {
    const [data, setData] = useState();

    const myAPI = process.env.EXPO_PUBLIC_API;
    const year = '2023';
    const month = '01';
    const day = '01';

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const url = `https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?&api_key=${myAPI}`;

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.clear();
                console.log(response);
                setData(response.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <GluestackUIProvider config={config}>
        <ScrollView>
            <View style={styles.main}>
                {
                    data && data.map((a, index) => {
                        return (
                            <View key={index} style={styles.main}>
                                <View style={styles.imgNum}>
                                    <Text style={styles.text}>Image #{index + 1}</Text>
                                </View>
                                <View style={styles.imgContainer}>
                                    <Image source={{ uri: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${a.image}.png` }} style={{ width: 200, height: 200 }} />
                                    <Box style={styles.description}>
                                        <Text style={styles.rightText}>THIS IMAGE WAS TAKEN BY NASA'S EPIC CAMERA ONBOARD THE NOAA DSCOVR SPACECRAFT</Text>
                                    </Box>
                                </View>
                                <Box style={styles.imgInfo}>
                                    <Text style={styles.text}>Date: {monthNames[Number(a.date.slice(5, 7))]} {Number(a.date.slice(8, 10))}, {a.date.slice(0, 4)}</Text>
                                    <Text style={styles.text}>x: {a.centroid_coordinates.lat.toFixed(2)} y: {a.centroid_coordinates.lon.toFixed(2)}</Text>
                                </Box>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
        </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 30,
        paddingBottom: 60
    },
    text: {
        color: 'white',
        marginRight: 5
    },
    rightText: {
        color: 'white',
        textAlign: 'right',
        marginRight: 10
    },
    imgNum: {
        alignItems: 'flex-end',
    },
    imgContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40
    },
    description: {
        alignItems: 'flex-end',
        textAlign: 'right',
        maxWidth: 140
    },
    imgInfo: {
        backgroundColor: '#FC6600',
        padding: 10,
        borderRadius: 5,
        alignItems: 'flex-end'
    }
});

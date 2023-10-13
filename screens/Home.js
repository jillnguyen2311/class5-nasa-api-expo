import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NasaInfo from '../components/NasaInfo';

export default function Home() {
  return (
    <ScrollView>
    <View style={styles.main}>
      <NasaInfo />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

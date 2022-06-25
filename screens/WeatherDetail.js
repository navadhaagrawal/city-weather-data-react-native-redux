import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView,FlatList,TouchableOpacity } from 'react-native';

export default function WeatherDetail({route}) {
  const { weather, sys, name, main } = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{alignSelf: 'center', margin: 10, fontSize: 28}}> Weather Forecast</Text>
      </View>
      <View>
        <Text style={{alignSelf: 'center', fontSize: 20}}> {name} ({sys.country}) </Text> 
      </View>
      <Image
        style={{width: 100, height: 100, alignSelf: 'center'}}
        source = {{uri: `https://openweathermap.org/img/wn/${weather[0].icon}.png`}}
      />
      <View>
        <Text style={{alignSelf: 'center', fontSize: 45}}> {main.temp} K </Text> 
      </View>
      <View>
        <Text style={{alignSelf: 'center', fontSize: 20}}> {weather[0].main} </Text> 
      </View>
      <View style={{margin:20}}>
        <Text style={{fontSize: 14}}> Feels Like {main.feels_like} </Text>
        <Text style={{fontSize: 14}}> Min Temp {main.temp_min} </Text>
        <Text style={{fontSize: 14}}> Max Temp {main.temp_max} </Text>
        <Text style={{fontSize: 14}}> Pressure {main.pressure} </Text>
        <Text style={{fontSize: 14}}> Humidity {main.humidity} </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  }
});

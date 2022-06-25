import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { addCity } from '../redux/actions';

const Home = ({ navigation, city_list, addCity }) => {
  const [city, setCity] = React.useState('');

  //city is added to store along with weather details
  const handleAddCity = () => {
    //check if city already present
    const data = city_list.filter(
      (i) => i.city.toLowerCase() == city.toLowerCase()
    );
    if (!data.length) {
      addData(city);
    } else {
      Alert.alert('City already exists');
    }
    setCity('');
  };

  //api call to fetch weather data is made once only on adding city and stored in store
  const addData = (city) => {
    return new Promise(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=28e73b144c2fe1904c036a7253722736`
        )
        .then((response) => {
          //if city name is not valid, it will not added in list as response.error return city not found
          //storing city and corresponding weather
          addCity(city, response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    });
  };

  //Capitalizing 1st letter of city name
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //rendering cities list
  const renderCities = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Weather Detail', item.weather)}>
        <Text style={{ margin: 7 }}> {Capitalize(item.city)} </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ alignSelf: 'center', margin: 10, fontSize: 28 }}>
        List Of Cities
      </Text>
      {city_list.length ? (
        <Text style={{ alignSelf: 'center' }}>
          (Tap on city to check Weather Details)
        </Text>
      ) : (
        <Text style={{ alignSelf: 'center' }}>
          (Add new city to check Weather Details)
        </Text>
      )}
      <View style={{ margin: 10, marginTop: 35 }}>
        <FlatList data={city_list} renderItem={renderCities} />
      </View>
      <TextInput
        placeholder="Add new City"
        style={styles.inputBar}
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <View style={{ paddingLeft: 110, paddingRight: 110 }}>
        <Button title="Add" onPress={handleAddCity} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  inputBar: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 20,
    marginTop: 30,
    marginBottom: 10,
  },
});

//mapping
const mapStateToProps = (state, ownProps) => {
  return {
    city_list: state.cities.city_list,
  };
};
const mapDispatchToProps = { addCity };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// const cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Ahmedabad','Chennai','Kolkata','Surat','Pune','Jaipur','Lucknow','Kanpur','Nagpur','Indore','Thane','Bhopal'];

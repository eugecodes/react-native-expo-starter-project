import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {useFonts, Inter_900Black} from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Home with a list of all movies 
function HomeScreen({ navigation }) {
  let [movie, setMovie] = React.useState('');
  let [search, setSearch] = React.useState('');
  let [fontsLoaded] = useFonts({ Inter_900Black});
  var alertItemName = (item) => {alert(item.Title);}
  var contador=0; //without time...
  if(contador <=2){
  fetch("http://localhost:3000/movie", {"method": "GET", mode: 'cors'}).then(response => response.json()).then(response => {
        setMovie(response);
      }).catch(err => {
        console.log(err);
  })
  contador =  contador +1;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.item}><span style={{fontFamily: 'Didactic Gothic'}}>Best Movies & Actors / Actresses</span></Text>
      <TextInput style={{ height: 40, borderColor: 'white', padding: 5, borderWidth: 1}} placeholder="Search..."
        onChangeText={search => setSearch(search)}/>
      <View style={styles.container}>
      <FlatList data={movie} renderItem={({item}) => 
        <TouchableOpacity style={styles.item} key={item.Id} onPress={() => navigation.navigate('MovieDetailsScreen')}><Text>{item.Title}</Text></TouchableOpacity>}
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
// Details Screen for a movie & List of all actors of THAT Movie
function MovieDetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Movie Details Screen</Text>
    </View>
  );
}

// Details Screen for an actor / actress
function ActorsDetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Actor / Actress Details Screen</Text>
    </View>
  );
}

// Edit Screen for a movie

// Edit Screen for an actor / actress

const Stack = createStackNavigator();
function App() {
  return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
			<Stack.Screen name="ActorsDetails" component={ActorsDetailsScreen} />
		</Stack.Navigator>
	</NavigationContainer>
  );
}
// Styles Here ********
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
	backgroundColor: '#fff'
  },
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#0645AD'
  },
  buttonText: {
    color: '#fff'
  },
  item: {
	padding: 10,
	fontSize: 24,
	height: 44,
	shadowColor: "#000",
	shadowOffset: {
	width: 0,
	height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5
   }
});

export default App;
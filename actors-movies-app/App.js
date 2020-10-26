import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Home with a list of all movies 
function HomeScreen({ route, navigation }) {
	let [movie, setMovie] = React.useState('');
	let [search, setSearch] = React.useState('');
	let [fontsLoaded] = useFonts({ Inter_900Black});
	let [temp, setTemp] = React.useState([]);
	let [ext, setExt] = React.useState(0);
	let promise;  

	useEffect(() => {	
	promise = fetch("http://localhost:3000/movies", {"method": "GET", mode: 'cors'});
	promise.then(response => response.json()).then(data=>{
		setMovie(data);
		setTemp(data);
	}).catch(err => {
		console.log(err);
	});		
  }, [ext]);

  return (
    <View style={styles.container}>
      <Text style={styles.item}><span style={{fontFamily: 'Arial'}}>Best Movies & Actors / Actresses</span></Text>
      <TextInput style={{ height: 40, borderColor: 'white', padding: 5, borderWidth: 1}} placeholder="Search..."
        onChangeText={search => {
			let tem = [];
			movie.filter(function(item){ 
				if(item.Title.includes(search)){ 
					tem.push(item); 
				} 
			});
			console.log(tem);
			setSearch(search);
			setTemp(tem);
			}}/>
		<br />
		<div style={{ marginLeft: 10, borderWidth: 1 }}><Button color="cornflowerblue" title="Add New Movie" onPress={(ev)=> { navigation.navigate('MovieDetails', {mId: 0, refresh: ()=>{setExt(ext+1) }})}}/></div>	
		<br />
      <View style={styles.container}>
      <FlatList data={temp} keyExtractor={item => item.Title} renderItem={({item}) => 
        <TouchableOpacity style={styles.item} key={item.Id} onPress={() => navigation.navigate('MovieDetails', {mId: item.Id, refresh: ()=>{setExt(ext+1)} } )}><Text>{item.Title}</Text></TouchableOpacity>}
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// Details Screen for a movie & List of all actors of THAT Movie
function MovieDetailsScreen({ route, navigation }) {
	let {mId, refresh} = route.params
	let [movieInfoTitle, setmovieInfoTitle] = React.useState('');
	let [movieInfoRelease, setmovieInfoRelease] = React.useState(0);
	let [movieInfoCasting, setmovieInfoCasting] = React.useState('');
	let [movieInfoDirectors, setmovieInfoDirectors] = React.useState('');
	let [movieInfoProducers, setmovieInfoProducers] = React.useState('');
	let obje = {Title: movieInfoTitle, ReleaseYear: movieInfoRelease, Casting: movieInfoCasting, Directors: movieInfoDirectors, Producers: movieInfoProducers};
	let promise;
	
  useEffect(() => {	
  if(mId > 0){
	promise = fetch(`http://localhost:3000/movie/${ mId }`, {"method": "GET", mode: 'cors'});
	promise.then(response => response.json()).then(data=>{
		setmovieInfoTitle(data["Title"]);
		setmovieInfoRelease(data["Release Year"]);
		setmovieInfoCasting(data["Casting"]);
		setmovieInfoDirectors(data["Directors"]);
		setmovieInfoProducers(data["Producers"]);
	    //console.log(mId);
	});
  }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'top', backgroundColor: 'white' }}>
    <Text style={styles.detailsTitle}><span>Movie Details</span></Text>
	  <hr />
		<Text style={styles.textTitleBox}>Title</Text>
		<TextInput style={{ height: 40, borderColor: 'gray', marginLeft: 10, borderWidth: 1, width: '90%' }} onChangeText={(text) => { setmovieInfoTitle(text) }} value={movieInfoTitle} />
		<Text style={styles.textTitleBox}>Release Year</Text>
		<TextInput type="Number" style={{ height: 40, borderColor: 'gray', marginLeft: 10, borderWidth: 1, width: '90%' }} onChangeText={(text) => { setmovieInfoRelease(text.replace(/[^0-9]/g, '')) }} value={movieInfoRelease} />		
		<Text style={styles.textTitleBox}>Casting</Text>
		<TextInput style={{ height: 40, borderColor: 'gray', marginLeft: 10, borderWidth: 1, width: '90%' }} onChangeText={(text) => { setmovieInfoCasting(text) }} value={movieInfoCasting} />		
		<Text style={styles.textTitleBox}>Directors</Text>
		<TextInput style={{ height: 40, borderColor: 'gray', marginLeft: 10, borderWidth: 1, width: '90%' }} onChangeText={(text) => { setmovieInfoDirectors(text) }} value={movieInfoDirectors} />		
		<Text style={styles.textTitleBox}>Producers</Text>
		<TextInput style={{ height: 40, borderColor: 'gray', marginLeft: 10, borderWidth: 1, width: '90%' }} onChangeText={(text) => { setmovieInfoProducers(text) }} value={movieInfoProducers} />		
		<br />
		<br />
		<div style={{ marginLeft: 10, borderWidth: 1, width: '90%' }}><Button color="green" title="Save" onPress={(ev)=> { saveChangesMovie(mId, obje, refresh,navigation)}}/></div>	
		<br />
		<div style={{ marginLeft: 10, borderWidth: 1, width: '90%' }}><Button color="red" title="Delete" onPress={(ev)=> { deleteMovie(mId, refresh, navigation) }} /></div>	
	  </View>
  );  
}

function deleteMovie(id, refresh, navigation){
	let prom;
	prom = fetch('http://localhost:3000/movie/delete', {
	  method: 'POST',
	  headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({ ID: id	})
	});
	
	prom.then(response => {
	    if(response.status == 201){
			refresh();
			navigation.navigate('Home')
			
		}
	});
	
	
}
function saveChangesMovie(id, objec, refresh, navigation){
	let prom;
	prom = fetch('http://localhost:3000/movie/save', {
	  method: 'POST',
	  headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
		ID: id,
		Title: objec["Title"],
		ReleaseYear: objec["ReleaseYear"],
		Casting: objec["Casting"],
		Producers: objec["Producers"],
		Directors: objec["Directors"],
		})
	});
	
	prom.then(response => {
	    if(response.status == 201){
			refresh();
			if(id > 0){
				navigation.navigate('Home');
			}else{
				
				response.json().then((data) => {
					navigation.navigate('Home');
				})
			}
		}
	});
	
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
		<Stack.Navigator>
			<Stack.Screen name="Home" component={ HomeScreen } />
			<Stack.Screen name="MovieDetails" component={ MovieDetailsScreen } />
			<Stack.Screen name="ActorsDetails" component={ ActorsDetailsScreen } />
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
	},
	detailsTitle: {
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
		elevation: 5,
		width: '100%',
		textAlign: 'center'
	},
	textTitleBox:{
		fontSize: 18,
		fontWeight: 500,
		textAlign: 'left',
		width: '100%',
		marginLeft: 10
	},
	textDescBox:{
		fontSize: 14,
		textAlign: 'left',
		width: '100%',
		marginLeft: 10
	}
});

export default App;
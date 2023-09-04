import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import music from "./music";
import hobbies from "./hobbies";
const Item = ({ id, name, last_name, onPress, avatar }) => (
  <View style={styles.container}>
    <Image source={{ uri: avatar }} style={styles.img} />
    <Text style={styles.name} onPress={onPress}>
      {`${id}: ${name} ${last_name}`}
    </Text>
  </View>
);
function HomeScreen({ navigation }) {
  const [Contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {},
        };

        const response1 = await fetch("https://reqres.in/api/users", options);
        const data1 = await response1.json();

        const response2 = await fetch(
          "https://reqres.in/api/users?page=2",
          options
        );
        const data2 = await response2.json();

        const combinedData = [...data1.data, ...data2.data];

        setContacts(combinedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={Contacts}
        renderItem={({ item }) => (
          <Item
            name={item.first_name}
            last_name={item.last_name}
            id={item.id}
            avatar={item.avatar}
            onPress={() =>
              navigation.navigate("Details", {
                itemId: item.id,
                itemName: item.first_name + " " + item.last_name,
                ItemEmail: item.email,
                IteamAvatar: item.avatar,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { itemId, itemName, ItemEmail, IteamAvatar } = route.params;
  const randomSong = Math.floor(Math.random() * music.length);
  const RandomHobbie = Math.floor(Math.random() * hobbies.length);
  const age = Math.floor(Math.random() * (78 - 25 + 1)) + 25;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image source={{ uri: IteamAvatar }} style={styles.imgDetails} />
      <Text style={styles.txtDetails}>My name is :</Text>
      <Text style={styles.txtDetails}>{itemName}</Text>
      <Text style={styles.txtDetails}>id: {itemId}</Text>
      <Text style={styles.txtDetails}>Email: </Text>
      <Text style={styles.txtDetails}>{ItemEmail}</Text>
      <Text style={styles.txtDetails}>Age: {age}</Text>
      <Text style={styles.txtDetails}>In My free Time i like :</Text>
      <Text style={styles.txtDetails}> {hobbies[RandomHobbie]}</Text>
      <Text style={styles.txtDetails}>Favorite Song: Taylor Swift</Text>
      <Text style={styles.txtDetails}> {music[randomSong]}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginTop: 0,
    padding: 20,
  },
  name: {
    marginVertical: 8,
    marginHorizontal: 10,
    fontSize: 28,
  },
  img: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  imgDetails: {
    borderRadius: 30,
    width: 200,
    height: 200,
    margin: 20,
  },
  txtDetails: {
    fontSize: 24,
    padding:7
  },
});

export default App;

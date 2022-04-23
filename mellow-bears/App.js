import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useCallback, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen({navigation}) {
  return (
    <>
    <View style={{flex: 1}}>
      <ImageBackground source={require("./images/mellow-home.jpg")} resizeMode="cover" style={{flex: 1}}>
        <Text style={styles.homeText}>Mellow Bears</Text>
        <Text style={styles.bodyText}>Specialized teddy bears, providing comfort and companionship to your home and loved ones as the perfect snuggle buddies.</Text>
      </ImageBackground>
      <Button
      buttonStyle={styles.buttonStyle}
      title="Shop the Collection"
      onPress={() => navigation.navigate("Shop")}></Button>
    </View>
    </>
  )
}

function ShopScreen({navigation}) {
  let [teddyBear, setTeddyBear] = useState("")
  let teddyBearList = [
    { 
      id: "1",
      teddyName: "Bench Teddy", 
      price: "$15.00", 
      url: "https://i.imgur.com/dhUEsox.png",
      // src: require("./images/bench-teddy.png"),
  },
    {
      id: "2",
      teddyName: "Colorful Teddy", 
      price: "$20.00", 
      url: "https://i.imgur.com/zuOO2Xb.png",
      // src: require("./images/colorful-teddy.png"),
    },
    {
      id: "3",
      teddyName: "Couch Teddy", 
      price: "$14.00",
      url: "https://i.imgur.com/CRu94hV.png",
      // src: require("./images/couch-teddy.png"),
  },
    {
      id: "4",
      teddyName: "Flower Teddy", 
      price: "$12.00", 
      url: "https://i.imgur.com/JWezYcm.png",
      // src: require("./images/flower-teddy.png"),
    },
    {
      id: "5",
      teddyName: "Angry Teddy", 
      price: "$17.00", 
      url: "https://i.imgur.com/qNvzhYW.png",
      // src: require("./images/angry-teddy.png"),
    },
    {
      id: "6",
      teddyName: "Christmas Teddy", 
      price: "$22.00", 
      url: "https://i.imgur.com/bLZhTPw.png",
      // src: require("./images/christmas-teddy.png"),
    },
];


  return (
    <>
    <View style={[styles.container, styles.backgroundColor]}>
      <Text style={styles.shopTitleText}>Shop the Mellow Bears Collection</Text>
    </View>
    <SafeAreaView style={styles.backgroundColor}>
      <FlatList
      // vertical={true}
      data={teddyBearList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate({
            name: "Form",
            params: { teddyBearName: item.teddyName },
            merge: true,
          })}>
            <View
            style={{justifyContent: "center", alignItems: "center"}}>
              <Image 
              source={{uri: item.url}} 
              resizeMode="contain"
              style={{height: 200, width: 200}}
              />
            </View>

          <Text style={[styles.backgroundColor, styles.shopBodyText]}>{item.teddyName}</Text>
          <Text style={[styles.backgroundColor, styles.shopBodyText]}>{item.price}</Text>
          
        </TouchableOpacity>    
      </>
         
      )}
      >
      </FlatList>
    </SafeAreaView>
   
    <View style={[styles.backgroundColor, styles.buttonContainer]}>
      <Button
        buttonStyle={styles.buttonRow}
         title="Check Out"
         onPress={() => navigation.navigate("Form")}></Button>
        <Button
         buttonStyle={styles.buttonRow}
         title="Back Home"
         onPress={() => navigation.navigate("Home")}></Button>
    </View>
    </>
  )
}

function FormScreen({navigation, route}) {
  let [displayText, setDisplayText] = useState("");

  let formData = [
    {
       placeholder: "Email", 
       id: "1"
    },
    {
      placeholder: "Phone Number", 
      id: "2"
   },
   {
    placeholder: "Name", 
    id: "3"
  },
  ]
  // console.log(route.params.teddyBearName)
  // console.log(navigation.getParam("teddyName"))
  return (
    <>
    <View style={[styles.container, {backgroundColor: "#B1B7A1"}]}>
      <Text style={styles.homeText}>Check Out</Text>
      <Text style={styles.bodyText}>Place your order in the form below for {route.params?.teddyBearName} </Text>
      <SafeAreaView>
        <FlatList
          data={formData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <>
              <TextInput
              placeholder={item.placeholder}
              style={styles.input}
              value={item.displayText}
              onChangeText={setDisplayText}
            ></TextInput>
          </>
          )} >
          
        </FlatList>
      </SafeAreaView>
      <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonRow}
            title="Submit"
            onPress={() => navigation.navigate({
              name: "Submit",
              params: {display: displayText},
              merge: true,
            })}
           
          ></Button>
          <Button
          buttonStyle={styles.buttonRow}
          title="Reorder"
          onPress={() => navigation.navigate("Shop")}></Button>
          <Button
          buttonStyle={styles.buttonRow}
          title="Back Home"
          onPress={() => navigation.navigate("Home")}></Button>
      </View>
    </View>
    </>
  )
}

function SubmitScreen ({navigation, route}) {
  // console.log(route.params?.display)
  // console.log(route.params?.teddyBearName)
  // console.log(route.params?.teddyBear)
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#B1B7A1"}}>
    <Text style={styles.congratsText}>Congrats {route.params?.display}! Your Teddy Bear is on it's way 🎉</Text>
    <Text style={styles.congratsSubText}>Your confirmation order for your Teddy Bear will be sent soon.</Text>
    {/* <Text style={styles.congratsSubText}>Your confirmation order for a {route.params.teddyBear} will be sent soon.</Text> */}
    {/* <Text style={styles.congratsSubText}>Your confirmation order for a {route.params?.teddyBearName} will be sent soon.</Text> */}
      <Button
      buttonStyle={styles.buttonStyle}
      title="Back Home"
      onPress={() => navigation.navigate("Home")}></Button>
    </View>
  )
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Shop"component={ShopScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
    alignSelf: "stretch"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  imageView: {
    flex: 1,
    flexDirection: "row",
    padding: 50,
  },
  imageContainer: {
    flex: 1,
    // justifyContent: "space-evenly",
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundColor: {
    backgroundColor: "#B1B7A1"
  },
  shopTitleText: {
    fontSize: 30,
    color: "#E1CCA6",
    top: 0,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 32,
  },
  shopBodyText: {
    fontSize: 20,
    color: "#E1CCA6",
    textAlign: "center",
    fontWeight: "bold"
  },
  homeText: {
    fontSize: 45,
    color: "#E1CCA6",
    // position: "sticky",
    top: 0,
    paddingLeft: "40px",
    paddingRight: "40px",
    // backgroundColor: "#C7571B",
  },
  bodyText: {
    fontSize: 25,
    color: "#E1CCA6",
    // position: "sticky",
    top: 0,
    paddingLeft: "40px",
    // backgroundColor: "#D96B28",
    //paddingRight: 350,
    flexWrap: "wrap",
    // https://stackoverflow.com/questions/46387355/text-shadow-in-react-native
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttonStyle: {
    borderRadius: 8,
    backgroundColor: "#99B6C7",
    color: "#FFFFFF",
    // width: "100%",
    // alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    borderRadius: 8,
    backgroundColor: "#99B6C7",
    color: "#FFFFFF",
    // width: "100%",
    // alignSelf: "stretch",
   
    // justifyContent: "center",
    // alignItems: "center",
    //justifyContent: "flex-end",
    //alignItems: "flex-end",
  },
  input: {
    height: 40,
    margin: 24,
    borderWidth: 1,
    padding: 20,
    // width: "100%",
    color: "#FFFFFF",
  },
  text: {
    fontWeight: "bold",
    // fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  congratsText: {
    fontSize: 30,
    // flex: 1,
    textAlign: "center",
    paddingTop: 50,
    paddingBottom: 20,
    color: "#FFFFFF",
  },
  congratsSubText: {
    fontSize: 20,
    // flex: 1,
    textAlign: "center",
    paddingBottom: 10,
    color: "#FFFFFF",
  }
});

//Images in Imgur: https://imgur.com/a/KboRIDE
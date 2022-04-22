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
  let teddyBearList = [
    { 
      id: "1",
      name: "Bench Teddy", 
      price: "$15.00", 
      url: "https://i.imgur.com/dhUEsox.png",
      // src: require("./images/bench-teddy.png"),
  },
    {
      id: "2",
      name: "Colorful Teddy", 
      price: "$20.00", 
      url: "https://i.imgur.com/zuOO2Xb.png",
      // src: require("./images/colorful-teddy.png"),
    },
    {
      id: "3",
      name: "Couch Teddy", 
      price: "$14.00",
      url: "https://i.imgur.com/CRu94hV.png",
      // src: require("./images/couch-teddy.png"),
  },
    {
      id: "4",
      name: "Flower Teddy", 
      price: "$12.00", 
      url: "https://i.imgur.com/JWezYcm.png",
      // src: require("./images/flower-teddy.png"),
    },
    {
      id: "5",
      name: "Angry Teddy", 
      price: "$17.00", 
      url: "https://i.imgur.com/qNvzhYW.png",
      // src: require("./images/angry-teddy.png"),
    },
    {
      id: "6",
      name: "Christmas Teddy", 
      price: "$22.00", 
      url: "https://i.imgur.com/bLZhTPw.png",
      // src: require("./images/christmas-teddy.png"),
    },
];


  return (
    <>
    <View style={[styles.container, styles.backgroundColor]}>
      <Text style={styles.homeText}>Shop the Mellow Bears Collection</Text>
    </View>
    <SafeAreaView>
      <FlatList
      vertical={true}
      data={teddyBearList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate("Form")}>

          <Image source={{uri: item.url}} />
          

          <Text style={styles.backgroundColor}>{item.name}</Text>
          <Text style={styles.backgroundColor}>{item.price}</Text>
          
        </TouchableOpacity>    
      </>
         
      )}
      >
      </FlatList>
    </SafeAreaView>
   
    <View style={[styles.backgroundColor, styles.container]}>
      <Button
        buttonStyle={styles.buttonStyle}
         title="Check Out"
         onPress={() => navigation.navigate("Form")}></Button>
        <Button
         buttonStyle={styles.buttonStyle}
         title="Back Home"
         onPress={() => navigation.navigate("Home")}></Button>
    </View>
    </>
  )
}

function FormScreen({navigation}) {
  let formData = [
    {
      placeholder: "Phone Number",
      label: "phone",
      regex: /^\(\d{3}\) \d{3}-\d{4}$/,
      error: "Invalid phone number, please enter in (xxx) xxx-xxxx",
    },
    {
      placeholder: "Email",
      label: "email",
      regex: /^.+@.+\..+$/,
      error: "Invalid email",
    },
    {
      placeholder: "First Name",
      label: "firstName",
      regex: /^[^\d=?\\/@#%^&*()]+$/,
      error: "Invalid first name",
    },
    {
      placeholder: "Last Name",
      label: "lastName",
      regex: /^[^\d=?\\/@#%^&*()]+$/,
      error: "Invalid last name",
    },
    {
      placeholder: "Zip Code",
      label: "zipcode",
      regex: /^\d{5}$/,
      error: "Invalid zip code",
    },
  ];

  const FormItem = ({ formItem, value, setValue }) => {
    let [valid, setValid] = useState(false);
    let [error, setError] = useState("");
    let validate = (content, setError) => {
      // console.log("validating " + formItem.label + " with text " + content);
      if (formItem.regex.test(content)) {
        //setValue(content);
        setValid(true);
        setError("");
        // console.log("Why is it clearing?")
      } else {
        setValid(false);
        setError(formItem.error);
        // console.log("Phone invalid");
      }
    };
    

    return (
      <>
        <TextInput
          style={styles.input}
          onChangeText={(value) => validate(value, setError)}
          placeholder={formItem.placeholder}
        ></TextInput>
  
        <Text style={{ color: "red" }}>{error}</Text>
      </>
    );
  }
  return (
    <>
    <View style={[styles.container, {backgroundColor: "#B1B7A1"}]}>
      <Text style={styles.homeText}>Form</Text>
      <Text style={styles.bodyText}>Place your order in the form below</Text>
      {formData.map((formItem, index) => {
        let [form, setForm] = useState({});
        let [valid, setValid] = useState(false);
        return (
          <FormItem
          key={index}
            setValue={(newValue) => {
              setForm((prevForm) => {
                prevForm[formItem.label] = newValue;
                return { ...prevForm };
              });
            }}
            setValid={(value) => setValid(value)}
            formItem={formItem}
            value={form[formItem.label]}
          ></FormItem>
        );
      })}
      <Button
        buttonStyle={styles.buttonStyle}
        title="Submit"
        onPress={() => navigation.navigate("Submit")}
        // disabled={!valid}
      ></Button>
      <Button
      buttonStyle={styles.buttonStyle}
      title="Back Home"
      onPress={() => navigation.navigate("Home")}></Button>
    </View>
    </>
  )
}

function SubmitScreen ({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#B1B7A1"}}>
      <Text style={styles.congratsText}>Congrats! Your Teddy Bear is on it's way 🎉</Text>
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
        <Stack.Screen name="Form" component={FormScreen}/>
        <Stack.Screen name="Submit" component={SubmitScreen}/>
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
  imageView: {
    flex: 1,
    flexDirection: "row",
    padding: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
  },
  backgroundColor: {
    backgroundColor: "#B1B7A1"
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
    fontSize: 35,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    color: "#FFFFFF",
  }
});

//Images in Imgur: https://imgur.com/a/KboRIDE
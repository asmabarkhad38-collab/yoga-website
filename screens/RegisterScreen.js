import { ref, set } from "firebase/database";
import { database } from "../firebase/config";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

const user = userCredential.user;

await set(
  ref(database, `users/${user.uid}`),
  {
    email: email,
    createdAt:
      new Date().toLocaleString(),
  }
);
      Alert.alert(
        "Success",
        "Account created successfully!"
      );

      navigation.navigate("Login");

    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.link}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    padding:20,
    backgroundColor:"#fff"
  },
  title:{
    fontSize:30,
    fontWeight:"bold",
    color:"#FF7A00",
    textAlign:"center",
    marginBottom:30
  },
  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:15,
    marginBottom:15
  },
  button:{
    backgroundColor:"#FF7A00",
    padding:15,
    borderRadius:10
  },
  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  },
  link:{
    textAlign:"center",
    marginTop:20,
    color:"#FF7A00"
  }
});
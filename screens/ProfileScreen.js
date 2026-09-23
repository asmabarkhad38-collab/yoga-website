import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  getAuth,
  signOut,
} from "firebase/auth";

export default function ProfileScreen({
  navigation,
}) {
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);

      navigation.replace(
        "Login"
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Profile
      </Text>

      <Text style={styles.label}>
        Email:
      </Text>

      <Text style={styles.email}>
        {
          auth.currentUser
            ?.email
        }
      </Text>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={logout}
      >
        <Text
          style={
            styles.logoutText
          }
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      padding: 20,
      backgroundColor:
        "#fff",
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FF7A00",
      marginBottom: 20,
    },

    label: {
      fontSize: 16,
      color: "#666",
    },

    email: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 30,
      marginTop: 5,
    },

    logoutBtn: {
      backgroundColor:
        "#FF7A00",
      padding: 15,
      borderRadius: 10,
      width: "80%",
    },

    logoutText: {
      color: "#fff",
      textAlign:
        "center",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  ref,
  onValue,
} from "firebase/database";

import { database } from "../firebase/config";

export default function OrdersScreen() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    const ordersRef = ref(
      database,
      "orders"
    );

    onValue(
      ordersRef,
      (snapshot) => {
        const data =
          snapshot.val();

        if (data) {
          const loadedOrders =
            Object.keys(data).map(
              (key) => ({
                id: key,
                ...data[key],
              })
            );

          setOrders(
            loadedOrders.reverse()
          );
        } else {
          setOrders([]);
        }
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text
              style={styles.date}
            >
              {item.date}
            </Text>

            <Text
              style={styles.total}
            >
              Total: $
              {item.total}
            </Text>

            <Text
              style={styles.items}
            >
              Items:
            </Text>

            {item.items &&
              item.items.map(
                (
                  food,
                  index
                ) => (
                  <Text
                    key={index}
                  >
                    • {food.name}
                    {" x"}
                    {
                      food.quantity
                    }
                  </Text>
                )
              )}
          </View>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor:
        "#fff",
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      backgroundColor:
        "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      elevation: 3,
    },

    date: {
      color: "#666",
      marginBottom: 5,
    },

    total: {
      color: "#FF7A00",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },

    items: {
      fontWeight: "bold",
      marginBottom: 5,
    },
  });
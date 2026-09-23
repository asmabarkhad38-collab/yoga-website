import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  ref,
  onValue,
  update,
  remove,
  push,
  set,
} from "firebase/database";

import { database } from "../firebase/config";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartRef = ref(database, "cart");

    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const items = Object.keys(data).map(
          (key) => ({
            id: key,
            ...data[key],
          })
        );

        setCartItems(items);
      } else {
        setCartItems([]);
      }
    });
  }, []);

  const increaseQuantity = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    update(
      ref(database, `cart/${id}`),
      {
        quantity: item.quantity + 1,
      }
    );
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    if (item.quantity > 1) {
      update(
        ref(database, `cart/${id}`),
        {
          quantity:
            item.quantity - 1,
        }
      );
    }
  };

  const deleteItem = (id) => {
    remove(
      ref(database, `cart/${id}`)
    );

    Alert.alert(
      "Deleted",
      "Item removed from cart"
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Cart Empty",
        "Add food first"
      );
      return;
    }

    try {
      const orderRef = push(
        ref(database, "orders")
      );

      await set(orderRef, {
        items: cartItems,
        total: totalPrice,
        date:
          new Date().toLocaleString(),
      });

      await remove(
        ref(database, "cart")
      );

      Alert.alert(
        "Success",
        "Order placed successfully"
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
        My Cart
      </Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>
              ${item.price}
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  decreaseQuantity(
                    item.id
                  )
                }
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text>
                {item.quantity}
              </Text>

              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  increaseQuantity(
                    item.id
                  )
                }
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() =>
                deleteItem(item.id)
              }
            >
              <Text style={styles.delete}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>
        Total: ${totalPrice}
      </Text>

      <TouchableOpacity
        style={styles.orderBtn}
        onPress={placeOrder}
      >
        <Text
          style={styles.orderText}
        >
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
  },

  btn: {
    backgroundColor: "#FF7A00",
    padding: 10,
    borderRadius: 8,
  },

  delete: {
    color: "red",
    marginTop: 10,
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },

  orderBtn: {
    backgroundColor: "#FF7A00",
    padding: 15,
    borderRadius: 10,
  },

  orderText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
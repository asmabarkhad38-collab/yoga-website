import { ref, push } from "firebase/database";
import { database } from "../firebase/config";
import { Alert } from "react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function FoodDetailsScreen({ route }) {
  const { food } = route.params;

  const [quantity, setQuantity] = useState(1);
const addToCart = () => {
  push(ref(database, "cart"), {
    name: food.name,
    price: food.price,
    quantity: quantity,
    image: food.image,
  });

  Alert.alert(
    "Success",
    "Food added to cart"
  );
};
  return (
    <View style={styles.container}>
      <Image
        source={food.image }
        style={styles.image}
      />

      <Text style={styles.name}>{food.name}</Text>

      <Text style={styles.price}>
        ${food.price}
      </Text>

      <Text style={styles.description}>
        Delicious fresh food prepared with quality ingredients.
      </Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() =>
            quantity > 1 &&
            setQuantity(quantity - 1)
          }
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {quantity}
        </Text>

        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() =>
            setQuantity(quantity + 1)
          }
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cartBtn} onPress={addToCart}>
        <Text style={styles.cartText}>
          Add To Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff"
  },

  image:{
    width:"100%",
    height:250,
    borderRadius:15
  },

  name:{
    fontSize:28,
    fontWeight:"bold",
    marginTop:15
  },

  price:{
    fontSize:22,
    color:"#FF7A00",
    marginVertical:10
  },

  description:{
    color:"#666",
    fontSize:16
  },

  quantityContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:30
  },

  qtyBtn:{
    backgroundColor:"#FF7A00",
    width:40,
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10
  },

  qtyText:{
    color:"#fff",
    fontSize:20,
    fontWeight:"bold"
  },

  quantity:{
    marginHorizontal:20,
    fontSize:20,
    fontWeight:"bold"
  },

  cartBtn:{
    backgroundColor:"#FF7A00",
    padding:15,
    borderRadius:10,
    marginTop:30
  },

  cartText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:16
  }
});
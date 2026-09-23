import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const foods = [
  {
    id: "1",
    name: "Cheese Burger",
    price: 2,
    category: "Burger",
    image: require("../assets/cheese.jpg"),
  },
  {
    id: "2",
    name: "Bacon Burger",
    price: 3,
    category: "Burger",
    image: require("../assets/bacon.jpg"),
  },
  {
    id: "3",
    name: "Chicken Burger",
    price: 5,
    category: "Burger",
    image: require("../assets/Chickenburger.jpg"),
  },
  {
    id: "4",
    name: "Beef Burger",
    price: 4,
    category: "Burger",
    image: require("../assets/beefburger.jpg"),
  },
  {
    id: "3",
    name: "Small Pizza",
    price: 4,
    category: "Pizza",
    image: require("../assets/small.jpg"),
  },
  {
    id: "3",
    name: "Large Pizza",
    price: 8,
    category: "Pizza",
    image: require("../assets/large.jpg"),
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    price: 7,
    category: "Pizza",
    image: require("../assets/berbaroni.jpg"),
  },
  {
    id: "4",
    name: "Cheese Pizza",
    price: 9,
    category: "Pizza",
    image: require("../assets/pizza.jpg"),
  },
  {
    id: "5",
    name: "Grilled Chicken",
    price: 6,
    category: "Chicken",
    image: require("../assets/chicken.jpg"),
  },
  {
    id: "6",
    name: "pasta Chicken",
    price: 7,
    category: "Chicken",
    image: require("../assets/pasta.jpg"),
  },
  {
    id: "6",
    name: "rice Chicken",
    price: 7,
    category: "Chicken",
    image: require("../assets/rice.jpg"),
  },
  {
    id: "6",
    name: "Fried Chicken",
    price: 7,
    category: "Chicken",
    image: require("../assets/Chickens.jpg"),
  },
  {
    id: "7",
    name: "Apple juice",
    price: 4,
    category: "Drinks",
    image: require("../assets/Apple.jpg"),
  },
  {
    id: "8",
    name: "Banana Milkshake",
    price: 5,
    category: "Drinks",
    image: require("../assets/banana.jpg"),
  },
  {
    id: "8",
    name: "Strawberry Milkshake",
    price: 5,
    category: "Drinks",
    image: require("../assets/strow.jpg"),
  },
  {
    id: "8",
    name: "Mango Milkshake",
    price: 5,
    category: "Drinks",
    image: require("../assets/mangomilishake.jpg"),
  },
];

const categories = ["Pizza", "Burger", "Chicken", "Drinks"];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Pizza");

  const filteredFoods = foods.filter((food) => {
    if (search.trim() !== "") {
      return food.name
        .toLowerCase()
        .includes(search.toLowerCase());
    }

    return food.category === selectedCategory;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("FoodDetails", {
          food: item,
        })
      }
    >
      <TouchableOpacity style={styles.favoriteBtn}>
        <Ionicons
          name="heart-outline"
          size={18}
          color="#FF7A00"
        />
      </TouchableOpacity>

      <Image
        source={item.image}
        style={styles.image}
      />

      <Text
        numberOfLines={1}
        style={styles.foodName}
      >
        {item.name}
      </Text>

      <Text style={styles.foodCategory}>
        {item.category}
      </Text>

      <Text style={styles.price}>
        ${item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Welcome
          </Text>

          <Text style={styles.title}>
            Choose Your Favourite  Fast Food..
          </Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
          />

          <TextInput
            placeholder="Search food..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item &&
                styles.activeCategory,
            ]}
            onPress={() =>
              setSelectedCategory(item)
            }
          >
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={[
                styles.categoryText,
                selectedCategory === item &&
                  styles.activeCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>
        Popular Food
      </Text>

      <FlatList
        data={filteredFoods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No Food Found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  greeting: {
    fontSize: 18,
    color: "#666",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: 250,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF7A00",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  categoriesList: {
    height: 50,
    marginBottom: 15,
  },

  categoryButton: {
    paddingHorizontal: 18,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#fff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  activeCategory: {
    backgroundColor: "#FF7A00",
  },

  categoryText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },

  activeCategoryText: {
    color: "#fff",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },

  image: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },

  foodName: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
  },

  foodCategory: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  price: {
    fontSize: 16,
    color: "#FF7A00",
    fontWeight: "bold",
    marginTop: 5,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 18,
  },
});
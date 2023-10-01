import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { rupiah } from "../hooks/rupiahConvert";
export default function CardList({ qurbansByType }) {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;


  const numColumns = 2;
  const containerWidth = (screenWidth - 50) / numColumns;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.cardRow}>
        {qurbansByType.map((item, index) => (
          <Pressable
            onPress={() =>
              navigation.navigate("ProductDetail", { qurbanId: item.id })
            }
            key={index}
            style={[
              styles.cardContainer,
              { width: containerWidth, margin: 5 },
            ]}
          >
            <Image
              source={{ uri: item.imageUrl1 }}
              style={styles.bannerHomeLarge}
            />
            <View style={{ padding: 3, alignItems: "center" }}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.descriptionText} numberOfLines={1}>
                {item.description}
              </Text>
              <Text style={styles.cardText}>
                {rupiah(item.price)}/ {item.weight}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingVertical: 10,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
  },
  cardContainer: {
    width: 100,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerHomeLarge: {
    width: "100%",
    height: 150,
  },
  cardText: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 12.5
  },
  descriptionText: {
    paddingHorizontal: 5,
    color: "#808080",
  },
});

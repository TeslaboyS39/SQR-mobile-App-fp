import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { rupiah } from "../hooks/rupiahConvert";
export default function RecommendedCard({ qurbans }) {
  const navigation = useNavigation();

  if (!qurbans || qurbans.length === 0) {
    return <Text>No recommended qurbans available.</Text>;
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", overflow: "hidden" }}>
          {qurbans.map((e, i) => (
            // <Pressable
            //   key={i}
            //   style={styles.cardContainer}
            //   onPress={() =>
            //     navigation.navigate("ProductDetail", { qurbanId: e.id })
            //   }
            // >
            //   <Image
            //     source={{
            //       uri: `${e.imageUrl1}`,
            //     }}
            //     style={styles.bannerHome}
            //   />
            //   <View style={styles.textContainer}>
            //     <Text style={styles.cardText} numberOfLines={1}>
            //       {e.name}
            //     </Text>
            //     <Text style={styles.descriptionText} numberOfLines={2}>
            //       {e.description}
            //     </Text>
            //     <Text style={styles.priceText}>
            //       {rupiah(e.price)} / {e.weight}
            //     </Text>
            //   </View>
            // </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("ProductDetail", { qurbanId: e.id })
              }
              key={i}
              style={[styles.cardContainer, { width: 170, margin: 5 }]}
            >
              <Image
                source={{ uri: e.imageUrl1 }}
                style={styles.bannerHomeLarge}
              />
              <View style={{ padding: 3, alignes: "center" }}>
                <Text style={styles.cardText} numberOfLines={1}>
                  {e.name}
                </Text>
                <Text style={styles.descriptionText} numberOfLines={1}>
                  {e.description}
                </Text>
                <Text style={styles.cardText}>
                  {rupiah(e.price)}/ {e.weight}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
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
    fontSize: 12.5,
  },
  descriptionText: {
    paddingHorizontal: 5,
    color: "#808080",
  },
});

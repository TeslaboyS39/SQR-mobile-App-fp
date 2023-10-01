import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { qurbanType } from "../assets/assests";
import { useNavigation } from "@react-navigation/native";

export default function QurbanType() {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={styles.cardContainer}
            onPress={() => navigation.navigate("ProductList", { category: 1 })}
          >
            <Image
              source={{
                uri: `https://i.ibb.co/ydSDhJd/484-4843725-gambar-kepala-kambing-kartun-hd-png-download-removebg-preview.png`,
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>KAMBING</Text>
          </Pressable>
          <Pressable
            style={styles.cardContainer}
            onPress={() => navigation.navigate("ProductList", { category: 2 })}
          >
            <Image
              source={{
                uri: `https://i.ibb.co/ssZZ2M3/pngtree-big-black-bangs-black-and-white-cow-head-png-image-7163573-removebg-preview.png`,
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>SAPI</Text>
          </Pressable>
          <Pressable
            style={styles.cardContainer}
            onPress={() => navigation.navigate("ProductList", { category: 3 })}
          >
            <Image
              source={{
                uri: `https://i.ibb.co/brbx863/png-transparent-cartoon-sheep-sheep-head-smile-cartoon-line-art-cowgoat-family-removebg-preview.pngn`,
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>DOMBA</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 230,
    height: 100,
    backgroundColor: "#D0E7D2",
    marginTop: 10,
    marginEnd: 16,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  cardText: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

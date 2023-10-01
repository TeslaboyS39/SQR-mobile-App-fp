import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { colors, recommdedImage } from "../assets/assests";
import CardList from "../components/CardList";
import { useDispatch, useSelector } from "react-redux";
import { fetchQurbanByType } from "../stores/action";

export default function ProductList({ navigation, route }) {
  const { category } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  // const dataLength = recommdedImage.length;
  const dispatch = useDispatch();
  const qurbansByType = useSelector((state) => {
    return state.qurbansByType;
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    dispatch(fetchQurbanByType(category));
  }, []);
  //   let itemWidth = dataLength > 2 ? "50%" : "100%";

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color={colors.COLOR_PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            marginTop: 10
          }}
        >
          <Pressable onPress={() => navigation.goBack()} style={{ flex: 1 }}>
            <FontAwesome name={"arrow-circle-left"} size={30} color="black" />
          </Pressable>

          <View style={{ flex: 2, alignItems: "center", }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {qurbansByType[0].Category.name}
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ flex: 1, alignItems: "flex-end", opacity:0 }}
          >
            <FontAwesome name={"heart-o"} size={28} color="white" />
          </Pressable>
        </View>

        <CardList qurbansByType={qurbansByType} />
      </SafeAreaView>
    </SafeAreaProvider>
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
  },
  descriptionText: {
    paddingHorizontal: 5,
    color: "#808080",
  },
});

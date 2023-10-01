import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/assests";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotif } from "../stores/action";
import * as SecureStore from "expo-secure-store";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      let usertoken;
      try {
        usertoken = await SecureStore.getItemAsync("access_token");
      } catch (error) {
        console.log(error);
      }

      if (!usertoken) {
        navigation.navigate("Login");
      } else {
        dispatch(fetchNotif());
      }
    }, 5);
  }, []);

  const renderItem = (data) => (
    <View key={data.imageUrl} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={{ uri: data.imageUrl }} />
      </View>
      <View style={styles.imageInfo}>
        <Text style={styles.imageTitle}>{data.title}</Text>
        <Text style={styles.imageDescriptionText}>{data.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 , alignItems: "center"}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome
              style={{ marginLeft: 16 }}
              name={"arrow-circle-left"}
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notifikasi</Text>
        </View>
        <View
          style={{
            marginTop: 60,
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            backgroundColor: "#f4f4f4",
            elevation: 20,
            borderRadius: 10
          }}
        >
          <Text
            style={{
              textAlign: "center",
              padding: 10,
              fontSize: 16,
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Pohon yang anda sumbangkan akan sangat bermanfaat bagi lingkungan
            dan masyarakat sekitar
          </Text>
        </View>

        <View style={styles.container}>
          <Carousel
            pagination={PaginationLight}
            renderItem={renderItem}
            data={notification}
            loop
            autoplay
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    width: "100%",
    backgroundColor: colors.COLOR_PRIMARY,
  },
  headerText: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  container: {
    marginTop: -100,
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  imageInfo: {
    marginTop: 10,
    alignItems: "center",
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageDescriptionText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default Notification;

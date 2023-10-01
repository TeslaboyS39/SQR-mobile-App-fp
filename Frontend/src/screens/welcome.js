import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/assests";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: colors.COLOR_PRIMARY, flex: 1 }}>
      <SafeAreaProvider style={{ alignItems: "center" }}>
        <SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16 }}>
          <Image
            source={{
              uri: "https://i.ibb.co/9w9PfNv/OIG-removebg-preview.png",
            }}
            style={{
              width: 340,
              height: 340,
              alignItems: "center",
              marginTop: 50,
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          marginTop: 0,
          alignItems: "center",
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 300,
            width: 300,
            position: "absolute",
            top: -150,
          }}
        ></View>

        <Text
          style={{
            textAlign: "center",
            marginTop: -40,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Satu Aplikasi, Dua Tujuan Mulia
        </Text>
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
          Selamat datang di SQR, di mana kebaikan tumbuh dan bumi kita dijaga
          bersama. Mari kita bersama-sama bergerak menuju dunia yang lebih baik.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: colors.COLOR_PRIMARY,
            marginTop: 50,
            borderRadius: 18,
            paddingVertical: 18,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
            Let's Go
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

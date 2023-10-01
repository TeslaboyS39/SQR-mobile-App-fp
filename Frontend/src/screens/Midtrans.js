import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useNavigation } from "@react-navigation/native";

export default function Midtrans() {
  const navigation = useNavigation()
  const tokenMidtrans = useSelector((state) => {
    return state.tokenMidtrans;
  });

  console.log(tokenMidtrans, "disini token");
  return (
    <Layout>
      <>
        <WebView
          source={{
            uri: tokenMidtrans,
          }}
          onNavigationStateChange={(navState) => {
            // this.canGoBack = navState.canGoBack;

            if(navState.title.includes("/success")){
              navigation.navigate("Home")
            }
          }}
          style={{ flex: 1 }}
        />
      </>
    </Layout>
  );
}

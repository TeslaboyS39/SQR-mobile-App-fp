import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/assests";
import Header from "../components/Header";
import Banner from "../components/Banner";
import RecommendedCard from "../components/RecommendedCard";
import QurbanType from "../components/QurbanTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncCategorySuccess,
  fetchCategory,
  fetchHabit,
  fetchQurbans,
} from "../stores/action";
import useFetch from "../hooks/useFetch";
import * as SecureStore from "expo-secure-store";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  // const { data, loading, refetchData } = useFetch()
  // console.log(data)

  const dispatch = useDispatch();

  const categories = useSelector((state) => {
    return state.categories;
  });
  const qurbans = useSelector((state) => {
    return state.qurbans;
  });

  useEffect(() => {
    // dispatch(fetchHabit())

    setTimeout(async () => {
      let usertoken;
      try {
        usertoken = await SecureStore.getItemAsync("access_token");
      } catch (error) {
        console.log(error);
      }
      console.log(usertoken);
      setIsLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchQurbans());
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "column", marginHorizontal: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100%",
              }}
            >
              <ActivityIndicator
                style={{ alignItems: "center", justifyContent: "center" }}
                size="large"
                color={colors.COLOR_PRIMARY}
              />
            </View>
          ) : (
            <>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Header />
              </View>
              <View style={{ marginTop: 50 }}>
                <Banner />
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Recommended
                </Text>
                <RecommendedCard qurbans={qurbans} />
              </View>
              <View style={{ marginTop: 30, marginBottom: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Browse Qurban Type
                </Text>
                <QurbanType />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

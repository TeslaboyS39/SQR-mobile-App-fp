import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCartDetail, addToCart, fetchOneQurban } from "../stores/action";
import { colors } from "../assets/assests";
import YoutubePlayer from "react-native-youtube-iframe";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DropdownSelect from "react-native-input-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { rupiah } from "../hooks/rupiahConvert";
import * as SecureStore from "expo-secure-store";

export default function ProductDetail({ route, navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Akasia");
  const [onBehalfOf, setOnBehalfOf] = useState("");
  const { qurbanId } = route.params;
  const oneQurban = useSelector((state) => {
    return state.oneQurban;
  });
  const getToken = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVc = () => {
    navigation.navigate("VideoCall");
  };
  const videoUrl = oneQurban?.videoUrl || "";
  const videoId = videoUrl.split("/").pop();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleBasketDetail = (item) => {
    dispatch(addCartDetail(item));
  };

  const handleBack = () => {
    try {
      handleBasketDetail({
        onBehalfOf: onBehalfOf,
        name: oneQurban.name,
        price: oneQurban.price,
        imageUrl: oneQurban.imageUrl1,
      });
      handleAddToCart({
        QurbanId: oneQurban.id,
        onBehalfOf: onBehalfOf,
        treeType: selectedOption,
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  const screenWidth = Dimensions.get("window").width;

  const containerWidth = screenWidth < 450 ? 370 : 430;
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
    dispatch(fetchOneQurban(qurbanId));
  }, []);

  const options = ["Akasia", "Pinus", "Cemara", "Edelweis"];

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
        <View>
          {isLoading ? (
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
          ) : (
            <ScrollView>
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingStart: 20,
                  paddingEnd: 20,
                  paddingTop: 10,
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome
                    name={"arrow-circle-left"}
                    size={28}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleVc()}>
                  <FontAwesome name="phone" size={28} color="black" />
                </TouchableOpacity>
              </View>

              {/* Product Details */}
              <View style={{ padding: 16 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 15,
                  }}
                >
                  {[
                    oneQurban.imageUrl1,
                    oneQurban.imageUrl2,
                    oneQurban.imageUrl3,
                  ].map((imageUrl, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={{
                        width: 300,
                        height: 300,
                        resizeMode: "contain",
                        borderRadius: 20,
                        marginHorizontal: 10,
                      }}
                    />
                  ))}
                </ScrollView>
                <Text
                  style={{ paddingTop: 10, fontSize: 24, fontWeight: "bold" }}
                >
                  {oneQurban.name}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "500",
                    color: "#808080",
                    marginTop: 0,
                  }}
                >
                  {rupiah(oneQurban.price)}/{oneQurban.weight}
                </Text>

                {/* Description */}
                <View
                  style={{
                    borderRadius: 10,
                    marginTop: 20,
                    marginBottom: 5,
                    flex: 1,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 15,
                  }}
                >
                  <Text
                    style={{
                      paddingStart: 10,
                      paddingEnd: 10,
                      marginVertical: 15,
                      fontSize: 16,
                      marginTop: 16,
                    }}
                  >
                    {oneQurban.description}
                  </Text>
                </View>

                {/* YouTube Video */}
                <View
                  style={{
                    marginTop: 16,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {isFocused ? (
                    <YoutubePlayer
                      height={300}
                      play={playing}
                      videoId={videoId}
                    />
                  ) : null}
                </View>
                {isFocused ? (
                  <TextInput
                    style={{
                      height: 60,
                      borderColor: "black",
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      marginTop: -60,
                      marginBottom: 10,
                    }}
                    placeholder="Atas Nama"
                    value={onBehalfOf}
                    onChangeText={(text) => setOnBehalfOf(text)}
                  />
                ) : null}
                {/* Tree Type Picker */}
                <View
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 15,
                    marginVertical: 16,
                  }}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
                  >
                    We plant trees where they’re needed the most
                  </Text>
                  <Text style={{ fontSize: 16, marginBottom: 16 }}>
                    Select Tree Type:
                  </Text>
                  <View style={{ height: 100 }}>
                    <DropdownSelect
                      placeholder="Select an option..."
                      options={options.map((v) => ({ label: v, value: v }))}
                      selectedValue={selectedOption}
                      onValueChange={(value) => setSelectedOption(value)}
                      primaryColor={"green"}
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: "start", paddingHorizontal: 3, marginTop: -10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        paddingHorizontal: 5,
                        textAlign: "justify",
                      }}
                    >
                      Kita perlu mengambil tindakan sekarang untuk menyelamatkan
                      Hutan Bromo. Mari bersama-sama melakukan reboisasi untuk
                      memulihkan keindahannya dan menjaga ekosistem yang
                      berharga ini.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Add to Basket Button */}
              <TouchableOpacity
                onPress={() => {
                  if (oneQurban) {
                    const basketDetail = {
                      name: oneQurban.name || "Default Name",
                      price: oneQurban.price || 0,
                      imageUrl: oneQurban.imageUrl1 || "",
                      onBehalfOf: onBehalfOf || "",
                    };
                    const cartItem = {
                      QurbanId: oneQurban.id || 0,
                      onBehalfOf: onBehalfOf || "",
                      treeType: selectedOption || "Default Tree Type",
                    };

                    handleBasketDetail(basketDetail);
                    handleAddToCart(cartItem);
                    navigation.navigate("Home");
                  }
                }}
                style={{
                  backgroundColor: colors.COLOR_PRIMARY,
                  margin: 16,
                  padding: 16,
                  borderRadius: 8,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,
                  elevation: 15,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="basket-plus"
                    size={26}
                    color="#fff"
                  />
                  <Text
                    style={{
                      marginStart: 10,
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Add to Basket
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

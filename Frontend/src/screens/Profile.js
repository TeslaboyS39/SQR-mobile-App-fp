import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/assests";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneOrderList, fetchOrderList } from "../stores/action";
import dateFormat from "../hooks/dateFormat";
import { useNavigation } from "@react-navigation/native";
import { rupiah } from "../hooks/rupiahConvert";

const ProfilePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => {
    return state.orderList;
  });

  function isValidUrl(string) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(string);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: null,
    userId: null,
    phoneNumber: null,
    imageUrl: null,
    email: null,
  });

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("phoneNumber");
      await SecureStore.deleteItemAsync("imageUrl");
      await SecureStore.deleteItemAsync("email");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      let usertoken;
      try {
        usertoken = await SecureStore.getItemAsync("access_token");
        const username = await SecureStore.getItemAsync("username");
        const userId = await SecureStore.getItemAsync("userId");
        const phoneNumber = await SecureStore.getItemAsync("phoneNumber");
        const imageUrl = await SecureStore.getItemAsync("imageUrl");
        const email = await SecureStore.getItemAsync("email");

        setUserData({
          username,
          userId,
          phoneNumber,
          imageUrl,
          email,
        });
      } catch (error) {
        console.log(error);
      }

      if (!usertoken) {
        navigation.navigate("Login");
      }
      dispatch(fetchOrderList(usertoken));
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileInfo}>
              <Image
                source={{
                  uri: isValidUrl(userData?.imageUrl)
                    ? userData.imageUrl
                    : "https://i.ibb.co/K0tTRpf/user.png",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.username}>
                  {userData?.username || "Nama Pengguna"}
                </Text>
                <Text style={styles.email}>
                  {userData?.email || "email@example.com"}
                </Text>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.orderListContainer}>
              <Text style={styles.orderListHeader}>Daftar Pesanan</Text>

              {orderList?.length > 0 ? (
                orderList.map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.orderItem}
                    onPress={() =>
                      navigation.navigate("OrderDetail", {
                        orderId: item.id,
                      })
                    }
                  >
                    <Text style={styles.orderNumber}>Order {item?.OrderId}</Text>
                    <Text style={styles.orderDate}>
                      Tanggal: {dateFormat(item?.updatedAt)}
                    </Text>
                    <Text style={styles.orderAmount}>
                      Total: {rupiah(item?.totalPrice)}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.noOrdersText}>
                  Tidak ada pesanan yang tersedia.
                </Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5F5F5",
    textAlign: "center",
  },
  profileInfo: {
    backgroundColor: "white",
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#808080",
  },
  logoutButton: {
    backgroundColor: "#b23b3b",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 10,
    width: "35%",
    opacity: 0.9
  },
  logoutButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  orderListContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  orderListHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.COLOR_PRIMARY,
  },
  orderDate: {
    fontSize: 16,
    color: "#808080",
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "bold",
    // color: colors.COLOR_PRIMARY,
  },
  noOrdersText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#808080",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfilePage;

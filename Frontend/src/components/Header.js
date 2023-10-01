import { Image, Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  return (
    <>
      <Image
        source={{
          uri: "https://i.ibb.co/Nm8LW9j/logo-home-screen-removebg-preview.png",
        }}
        style={{
          width: 150,
          height: 30,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: 16,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Notification")}
          style={{ marginRight: 12 }}
        >
          <FontAwesome name="bell-o" size={28} color="black" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("MyBasket")}
          style={{ marginRight: 12 }}
        >
          <FontAwesome name={"shopping-basket"} size={28} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <FontAwesome name="user-o" size={28} color="black" />
        </Pressable>
      </View>
    </>
  );
}

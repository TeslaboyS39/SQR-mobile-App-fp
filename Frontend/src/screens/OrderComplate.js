import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/assests";

export default function OrderComplateScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ marginTop: 80, marginBottom: 20 }}>
              <Image style={{ width: 200, height: 200 }} source={require("../assets/centang.gif")} />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 40 }}>Congratulations!!!</Text>
            </View>
            <View style={{ marginBottom: 80 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Make people and nature smile</Text>
            </View>
            <View style={{ marginBottom: 80 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("History")}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: colors.COLOR_PRIMARY, marginHorizontal: 20, paddingVertical: 18, width: 200, borderRadius: 10 }}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "#fff" }}>Track Order</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  marginHorizontal: 20,
                  paddingVertical: 18,
                  width: 300,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: colors.COLOR_PRIMARY,
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: colors.COLOR_PRIMARY }}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/assests";
import { MaterialIcons } from "@expo/vector-icons";

export default function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 0.4, backgroundColor: colors.COLOR_PRIMARY }}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", marginHorizontal: 20, paddingVertical: 2, width: 90, borderRadius: 18 }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={{ textAlign: "center", fontWeight: "400", fontSize: 15 }}>Go Back</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#F5F5F5" }}>History Pembelian</Text>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ backgroundColor: "#fff", borderBottomWidth: 2, borderBottomColor: "#F4F4F4", marginTop: 10, paddingStart: 20, paddingEnd: 20, paddingVertical: 25, flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginEnd: 15, backgroundColor: "#FFF7D4", borderRadius: 5, width: 50, height: 50 }}></View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Kambing Wagyu</Text>
              <Text style={{ fontWeight: "400" }}>1 ekor</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "600" }}>2.000.000</Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", borderBottomWidth: 2, borderBottomColor: "#F4F4F4", marginTop: 10, paddingStart: 20, paddingEnd: 20, paddingVertical: 25, flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginEnd: 15, backgroundColor: "#FFF7D4", borderRadius: 5, width: 50, height: 50 }}></View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Kambing Wagyu</Text>
              <Text style={{ fontWeight: "400" }}>1 ekor</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "600" }}>2.000.000</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

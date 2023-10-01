import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome";
import Home from "../screens/Home";
import History from "../screens/History";
import Login from "../screens/Login";
import ProductList from "../screens/ProductList";
import Register from "../screens/Register";
import ProductDetail from "../screens/ProductDetail";
import MyBasket from "../screens/MyBasket";
import Notifikasi from "../screens/Notifikasi";
import OrderComplate from "../screens/OrderComplate";
import Midtrans from "../screens/Midtrans";
import ProfilePage from "../screens/Profile";
import videoCall from "../screens/VideoCall";
import VideoCall from "../screens/VideoCall";
import OrderDetail from "../screens/OrderDetail";
import Notification from "../screens/Notification";
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="MyBasket" component={MyBasket} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="OrderComplate" component={OrderComplate} />
        <Stack.Screen name="Midtrans" component={Midtrans} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

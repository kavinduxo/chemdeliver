import React from 'react';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import History from './components/History';
import Signup from './components/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNav from './components/DrawerNav';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const signout = () => {
    setIsUserLoggedIn(false);
    setProfile(null);
  };

  const login = async (user) => {
    const existingUser = {
      userId: "sadeshS",
      password: "123456789"
    }
    if (user.userId == existingUser.userId && user.password == existingUser.password) {
      setProfile(existingUser);
      setIsUserLoggedIn(true);
    }
  }

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
        {!isUserLoggedIn ? (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login">
                {props => <Login {...props} login={login} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {props => <Signup {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        ):(  
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"DrawerNav"} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="DrawerNav">
                {props => <DrawerNav {...props} userId={profile.userId} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        )}
    </SafeAreaProvider>
  );
}

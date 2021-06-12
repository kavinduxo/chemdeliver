import React from 'react';
import { StyleSheet } from 'react-native';
import Login from './components/Login';
import { Container, Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import History from './components/History';

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
    <Root>
      {/* <View> */}
      {!isUserLoggedIn ? (
        <Login login={login} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={History} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {/* </View> */}
    </Root>
  );
}
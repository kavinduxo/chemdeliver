import React from 'react';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import History from './components/History';
import Signup from './components/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getUser } from './services/usersService';
import DrawerNav from './components/DrawerNav';
import BcryptReactNative from 'bcrypt-react-native';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const signout = () => {
    setIsUserLoggedIn(false);
    setProfile(null);
    return false;
  };

  const login = async (user) => {
    const existingUser = await getUser(user.userId);
    const validPassword = await BcryptReactNative.compareSync(user.password, existingUser.password);
    if (user.userId == existingUser.medicalId && validPassword) {
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
                {props => <DrawerNav {...props} userId={profile.userId} signout={signout} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        )}
    </SafeAreaProvider>
  );
}

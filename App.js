import React from 'react';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './components/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getUser } from './services/usersService';
import { Base64 } from 'js-base64';
import Tabs from './components/Tabs';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signout = () => {
    setIsUserLoggedIn(false);
    setProfile(null);
    return false;
  };

  const login = async (user) => {
    setIsLoading(true);
    try {
      const existingUser = await getUser(user?.userId);
      const decode = Base64.decode(existingUser.password)
      if (user?.userId == existingUser.medicalId && user?.password == decode) {
        setProfile(existingUser);
        setIsUserLoggedIn(true);
      } else {
        throw new Error();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      {!isUserLoggedIn ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {props => <Login {...props} login={login} isLoading={isLoading} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => <Signup {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={"DrawerNav"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DrawerNav">
              {props => <DrawerNav {...props} user={profile} signout={signout} />}
            </Stack.Screen>
          </Stack.Navigator> */}
          <Tabs user={profile} signout={signout} />
        </NavigationContainer>
      )}
    </SafeAreaProvider>

  );
}



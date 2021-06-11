import React from 'react';
import { StyleSheet } from 'react-native';
import Login from './components/login';
import {Container, Root} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';

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
    if(user.userId == existingUser.userId && user.password == existingUser.password){
      setProfile(existingUser);
      setIsUserLoggedIn(true);
    }
  }

  const Stack = createStackNavigator();
  
  return (
    <Root>
      <Container style={styles.container}>
        {!isUserLoggedIn ? (
          <Login login={login}/>
        ):(
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

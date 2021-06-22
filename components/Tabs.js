import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withTheme } from "react-native-elements";
import HomePage from "./HomePage";
import MorePage from "./More";
import { StyleSheet, View, Image, Text } from "react-native";
import React from 'react';

const Tab = createBottomTabNavigator();

const Tabs = ({ user }) => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: "absolute",
                    bottom: 5,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "white",
                    borderRadius: 30,
                    height: 70,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={require('../assets/icons/home-icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? "#00CBBC" : "#7C7D7E",
                                    marginBottom: "25%"
                                }}
                            />
                        </View>
                    ),
                }}
            >
                {props => <HomePage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="A" options={{
                tabBarIcon: ({focused}) => {
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/h.png')}
                            resizeMode='contain'
                            style={{
                                width: 5,
                                height: 5,
                                tintColor: focused ? "red" : "red"
                            }}
                        />
                    </View>
                },
            }}>
                {props => <HomePage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="Order" options={{
                tabBarIcon: ({focused}) => {
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/h.png')}
                            resizeMode='contain'
                            style={{
                                width: 5,
                                height: 5,
                                tintColor: focused ? "red" : "red"
                            }}
                        />
                    </View>
                },
            }}>
                {props => <HomePage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="B" options={{
                tabBarIcon: ({focused}) => {
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/h.png')}
                            resizeMode='contain'
                            style={{
                                width: 5,
                                height: 5,
                                tintColor: focused ? "red" : "red"
                            }}
                        />
                    </View>
                },
            }}>
                {props => <HomePage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="More" options={{
                tabBarIcon: ({focused}) => {
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/h.png')}
                            resizeMode='contain'
                            style={{
                                width: 5,
                                height: 5,
                                tintColor: focused ? "red" : "red"
                            }}
                        />
                    </View>
                },
            }}>
                {props => <MorePage {...props} user={user} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#8e9491",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;
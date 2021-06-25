import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withTheme } from "react-native-elements";
import HomePage from "./HomePage";
import MorePage from "./More";
import PlaceOrderPage from "./PlaceOrderPage";
import MedicinesPage from "./MedicinesPage";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React from 'react';

const Tab = createBottomTabNavigator();

const CustomOrderButton = ({ onPress }) => (
    <TouchableOpacity
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 60,
                height: 60,
                borderRadius: 35,
                backgroundColor: '#00CBBC'
            }}
        >
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image 
                    source={require('../assets/icons/cart-icon.png')}
                    resizeMode='contain'
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: "white",
                        marginTop: 10
                    }}
                />
            </View>
        </View>
    </TouchableOpacity>
);

const Tabs = ({ user, signout }) => {
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
                    borderColor: "white",
                    height: "8%",
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
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? "#00CBBC" : "#7C7D7E",
                                    marginBottom: "30%"
                                }}
                            />
                        </View>
                    ),
                }}
            >
                {props => <HomePage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="A" 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={require('../assets/icons/b.png')}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? "#00CBBC" : "#7C7D7E",
                                    marginBottom: "30%"
                                }}
                            />
                        </View>
                    ),
                }}
            >
                {props => <MedicinesPage {...props}/>}
            </Tab.Screen>
            <Tab.Screen name="PlaceOrder" 
                options={{
                    tabBarButton: (props) => (
                        <CustomOrderButton {...props} />
                    )
                }}
            >
                {props => <PlaceOrderPage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="B" 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={require('../assets/icons/c.png')}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? "#00CBBC" : "#7C7D7E",
                                    marginBottom: "30%"
                                }}
                            />
                        </View>
                    ),
                }}
            >
                {props => <HomePage {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="More" 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={require('../assets/icons/d.png')}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? "#00CBBC" : "#7C7D7E",
                                    marginBottom: "30%"
                                }}
                            />
                        </View>
                    ),
                }}
            >
                {props => <MorePage {...props} user={user} signout={signout}/>}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "black",
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
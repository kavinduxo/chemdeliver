import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withTheme } from "react-native-elements";
import HomePage from "./HomePage";
import MorePage from "./More";
import MedicinesPage from "./MedicinesPage";
import PlaceOrder from "./PlaceOrder";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from 'react';

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
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
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
    const [meds, setMeds] = useState([]);

    const addingMedicine = (medicine) => {
        let m = [];
        let added = false;
        meds.map((me) => {
            if (me.name == medicine.name) {
                let tem = {
                    dir: me.dir,
                    name: me.name,
                    qty: medicine.qty,
                    price: me.price
                }
                added = true;
                m.push(tem);
            } else {
                m.push(me);
            }
        });
        if (added) {
            setMeds(m);
        } else {
            m.push(medicine);
            setMeds(m);
        }
    }

    const removingMedicine = (medicine) => {
        let m = [];
        meds.map((me) => {
            if (me.name == medicine.name) {
                if (medicine.qty == 0) {
                    return;
                } else {
                    let tem = {
                        dir: me.dir,
                        name: me.name,
                        qty: medicine.qty,
                        price: me.price
                    }
                    m.push(tem);
                }
            } else {
                m.push(me);
            }
        })
        setMeds(m);
    }

    return (
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
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
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
            <Tab.Screen name="Medicine"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
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
                {props => <MedicinesPage {...props} />}
            </Tab.Screen>
            <Tab.Screen name="PlaceOrder"
                options={{
                    tabBarButton: (props) => (
                        <CustomOrderButton {...props} />
                    )
                }}
            >
                {props => <PlaceOrder {...props} user={user} meds={meds} addingMedicine={addingMedicine} removingMedicine={removingMedicine} />}
            </Tab.Screen>
            <Tab.Screen name="More"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('../assets/icons/hamburg.png')}
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
                {props => <MorePage {...props} user={user} signout={signout} addingMedicine={addingMedicine} removingMedicine={removingMedicine} />}
            </Tab.Screen>
            <Tab.Screen name="SignOut"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('../assets/icons/sign-out.png')}
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
                    tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={()=>signout()}/>)
                }}
            >
                {props => <View />}
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
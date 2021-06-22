import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import NavHeader from './NavHeader';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../components/History';
import { Button } from 'native-base';
import PrescriptionList from './PrescriptionList';
import PrescriptionInformation from './PrescriptionInformation';

const Stack = createStackNavigator();

const MorePage = ({ user, navigation }) => {
    return(
        <Stack.Navigator initialRouteName={"More"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="More">
                {props => <More {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="TrackMyOrder">
                {props => <More {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="HistoryOrder">
                {props => <History {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="DeliveryDetails">
                {props => <More {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="PaymentMethod">
                {props => <More {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="ManagePrescription">
                {props => <PrescriptionList {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="PrescriptionInformation">
                {props => <PrescriptionInformation {...props} user={user} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const More = ({ navigation, user }) => {
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={{height: "90%"}}> 
                <NavHeader title={"More"} />
                <Button 
                    block
                    style={styles.buttons} 
                    onPress={() => {navigation.navigate("TrackMyOrder")}}>
                        <View style={styles.circle}>
                            <Image 
                                source={require('../assets/icons/trackOrder.png')}
                                resizeMode='contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: "#7C7D7E",
                                    marginTop: "14%"
                                }}
                            />
                        </View>
                        <Text style={styles.txt}>Track My Order          </Text>
                </Button>
                <Button 
                    block
                    style={styles.buttons}
                    onPress={() => {navigation.navigate("HistoryOrder")}}>
                        <View style={styles.circle}>
                            <Image 
                                source={require('../assets/icons/history.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: "#7C7D7E",
                                    marginTop: "20%"
                                }}
                            />
                        </View>
                        <Text style={styles.txt}>History Order             </Text>
                </Button>
                <Button 
                    block
                    style={styles.buttons}
                    onPress={() => {navigation.navigate("DeliveryDetails")}}>
                        <View style={styles.circle}>
                            <Image 
                                source={require('../assets/icons/deliveryItems.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: "#7C7D7E",
                                    marginTop: "20%"
                                }}
                            />
                        </View>
                        <Text style={styles.txt}>Delivery Details         </Text>
                </Button>
                <Button 
                    block
                    style={styles.buttons}
                    onPress={() => {navigation.navigate("PaymentMethod")}}>
                        <View style={styles.circle}>
                            <Image 
                                source={require('../assets/icons/payment.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: "#7C7D7E",
                                    marginTop: "25%"
                                }}
                            />
                        </View>
                        <Text style={styles.txt}>Payment Method      </Text>
                </Button>
                <Button 
                    block
                    style={styles.buttons}
                    onPress={() => {navigation.navigate("ManagePrescription")}}>
                        <View style={styles.circle}>
                            <Image 
                                source={require('../assets/icons/prescription.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: "#7C7D7E",
                                    marginTop: "16%"
                                }}
                            />
                        </View>
                        <Text style={styles.txt}>Manage Prescription</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    },
    buttons: {
        marginTop: "8%",
        marginLeft: "5%",
        marginRight: "5%",
        height: "12%",
        backgroundColor: "#F6F6F6"
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: "#D8D8D8",
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: "-10%"
    },
    txt:{
        color: "#4A4B4D",
        fontSize: 18,
        marginLeft: "25%"
    }
});

export default MorePage;
import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, ScrollView, Alert } from 'react-native'
import { Card } from 'react-native-elements'
import FavouriteStoreCard from './FavouriteStoreCard'
import { createOrder } from '../services/ordersService'


const OrderForm = () => {

    let favouriteCardProps = {
        storeId: 'AB123',
        address: 'Cnr Manchester Rd &, Gooding Dr, Carrara QLD 4211, Aus',
        storeName: 'DOCHEM Pharmacy',
        postCode: '4211',
        contact: '+61755XXXXXX'
    };

    const [storeId, setStoreId] = useState();
    const [prescNo, setPrescNo] = useState();

    const showSimpleAlert = (alertTitle, alertMsg) => {
        Alert.alert(alertTitle, alertMsg, [
            { text: "OK", onPress: () => console.log("ok Pressed") },
        ])
    }

    const handleSetOrder = async () => {
        try {
            var currentDateTime = new Date();
            var postCode = 'xx';
            var userId = 'test';
            var orderId = userId + currentDateTime.getFullYear() + (currentDateTime.getMonth() + 1) + currentDateTime.getDate() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
            var order = JSON.stringify({ "orderId": orderId, "userId": userId, "orderDate": currentDateTime, "storeId": storeId, "postCode": postCode, "prescriptionId": prescNo });
            await createOrder(order);
            Keyboard.dismiss();
            setPostCode(null);
            setPrescNo(null);
            showSimpleAlert("Purchased Successfully!", "Order Ref: " + orderId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <FavouriteStoreCard {...favouriteCardProps} />
                <Card>
                    <Card.Title style={{
                        color: '#FF7F50',
                        width: '100%',
                        fontSize: 17
                    }}
                    >Purchase the Order</Card.Title>
                    <Card.Divider />

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.inputStoreWrapper}>
                        <TextInput style={styles.input} placeholder={'Enter Store ID'} value={storeId} onChangeText={text => setStoreId(text)} />
                        <TextInput style={styles.input} placeholder={'Enter Pres. No.'} value={prescNo} onChangeText={text => setPrescNo(text)} />
                    </KeyboardAvoidingView>
                    <Card.Divider />
                    <View style={styles.ordBtn}>
                        <TouchableOpacity onPress={() => handleSetOrder()}>
                            <View style={styles.searchWrapper}>
                                <Text style={styles.textOnSearch}>🛒</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputStoreWrapper: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20
    },
    scrollView: {
        marginHorizontal: 20,
    },
    ordBtn: {
        position: 'relative',
        bottom: '4%',
        alignItems: 'center',
        paddingTop: 10
    },
    input: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        borderColor: '#2F4F4F',
        borderWidth: 1,
        width: '40%'

    },
    searchWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2F4F4F',
        borderWidth: 1,

    },
    textOnSearch: {
        fontSize: 25
    }
});

export default OrderForm;

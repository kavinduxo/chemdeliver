import React, { useState } from 'react'
import { Platform, Keyboard } from 'react-native';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Stores from './Stores';
import { Spinner } from 'native-base';
import { getStoresByPostCodeCwh, getStoresByPostCodeTwc } from '../services/storesService';

const OtherStoreList = ({ user }) => {

    const [postCode, setPostCode] = useState();

    const handleSearchStore = async () => {
        const data = await getStoresByPostCodeTwc(postCode);
        const data1 = await getStoresByPostCodeCwh(postCode);
        const filteredData = [];
        data.forEach(element => {
            if (element.postcode != user.postcode) {
                filteredData.push(element);
            }
        });
        data1.forEach(element => {
            if (element.postcode != user.postcode) {
                filteredData.push(element);
            }
        });
        setStoreData(filteredData);
        Keyboard.dismiss();
        setPostCode(null);
    }

    const [storeData, setStoreData] = useState(null);

    const stores = () => {

        if (!storeData) {
            return <Spinner />
        } else {

            const stores = storeData.map((store) => {
                return (
                    <View style={styles.items}>
                        <Stores id={"◉ Pharmacy ID   ✑ " + store.pharmacyID}
                            postcode={"◉ Post Code        ✑ " + store.postcode}
                            name={"◉ " + store.name}
                            contact={"◉ Contact No      ✑ " + store.contact_no} />
                    </View>
                )
            });

            return stores;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.storeWrapper}>
                    <Text style={styles.sectionTitle}>
                        Other Stores
                    </Text>

                     {stores()}

                </View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputStoreWrapper}>
                <TextInput style={styles.input} placeholder={'Enter a postcode..'} value={postCode} onChangeText={text => setPostCode(text)} />
                <TouchableOpacity onPress={() => handleSearchStore()}>
                    <View style={styles.searchWrapper}>
                        <Text style={styles.textOnSearch}>🔍</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: '25%'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    storeWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    inputStoreWrapper: {
        position: 'absolute',
        bottom: '8%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        borderColor: '#2F4F4F',
        borderWidth: 2,
        width: '60%'

    },
    searchWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2F4F4F',
        borderWidth: 2,

    },
    textOnSearch: {
        fontSize: 15
    }

});

export default OtherStoreList;
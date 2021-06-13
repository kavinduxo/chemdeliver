import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Stores from './Stores';
import { Spinner } from 'native-base';
import { getStoresByPostCodeCwh, getStoresByPostCodeTwc } from '../services/storesService';

const ClosestStoreList = ({ user }) => {

    useEffect(() => {
        async function getData() {
            const data = await getStoresByPostCodeTwc(user.postcode);
            const data1 = await getStoresByPostCodeCwh(user.postcode);
            const filteredData = [];
            data.forEach(element => {
                if (element.postcode == user.postcode) {
                    filteredData.push(element);
                }
            });
            data1.forEach(element => {
                if (element.postcode == user.postcode) {
                    filteredData.push(element);
                }
            });
            setStoreData(filteredData);
        }
        getData();
    }, []);

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
        <ScrollView style={styles.scrollView}>
            <View style={styles.storeWrapper}>
                <Text style={styles.sectionTitle}>
                    Stores Close by
                </Text>

                {stores()}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
    scrollView: {
        marginHorizontal: 10,
    },
});

export default ClosestStoreList;
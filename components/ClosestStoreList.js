import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Stores from './Stores';
import { Spinner } from 'native-base';
import { getStoresByPostCodeCwh, getStoresByPostCodeTwc } from '../services/storesService';

const ClosestStoreList = ({ user }) => {
    
    const [storeData, setStoreData] = useState(null);
    
    const getData = async () => {
        const data = await getStoresByPostCodeTwc(user.postcode);
        const data1 = await getStoresByPostCodeCwh(user.postcode);
        const filteredData = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                    if (data[i].postcode == user.postcode) {
                        filteredData.push(data[i]);
                    }
                }
            }
        }
        if (data1) {
            for (let i = 0; i < data.length; i++) {
                if (data1[i]) {
                    if (data1[i].postcode == user.postcode) {
                        filteredData.push(data1[i]);
                    }
                }
            }
        }
        return filteredData;
    }

    const stores = () => {
        if (!storeData) {
            return <Spinner />
        } else {
            const stores = storeData.map((store) => {
                if (store.pharmacyID != user.preferredPharmacy) {

                    let imgUrl = '';
                    if (store.pharmacyID.substring(0, 3) == 'cwh') {
                        imgUrl = 'https://www.franchisebusiness.com.au/app/uploads/2019/04/bigstock-Chemist-Warehouse-Australia-113332994-1920x1281.jpg';
                    } else if (store.pharmacyID.substring(0, 3) == 'twc') {
                        imgUrl = 'https://www.interiorfitouts.com.au/wp-content/uploads/2019/12/IMG_2984-HDR-scaled.jpg';
                    }
                    return (
                        <View style={styles.items} key={store.pharmacyID}>
                            <Stores id={store.pharmacyID}
                                address={store.address}
                                name={store.name}
                                contact={store.contact_no}
                                imgUrl={imgUrl} />
                        </View>
                    )
                }

            });

            return stores;
        }
    };

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        getData().then(data => {
            if (isMounted) setStoreData(data); 
        })
        return () => { isMounted = false };

    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.storeWrapper}>
                <Text style={styles.sectionTitle}>
                    Nearest Pharmacy
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
        paddingBottom: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00CBBC'
    },
    items: {
        marginTop: 10,
    },
    scrollView: {
        marginHorizontal: 10,
    },
});

export default ClosestStoreList;
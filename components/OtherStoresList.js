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
        paddingBottom: 30
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
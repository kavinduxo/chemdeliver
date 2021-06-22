import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, ScrollView, Alert, SafeAreaView, Image } from 'react-native'
import { Card } from 'react-native-elements'
import FavouriteStoreCard from './FavouriteStoreCard';
import ClosestStoreList from './ClosestStoreList';
import { getAllStoreCwh, getAllStoreTwc } from '../services/storesService';




const HomePage = ({ navigation, user }) => {

    const [favouriteCardProps, setFavouriteCardProps] = useState({});
    const [imgUrl, setImgUrl] = useState();

    useEffect(() => {
        let unmounted = false;
        async function getData() {
            const defData = await getAllStoreCwh();
            const defData1 = await getAllStoreTwc();
            defData.forEach(element => {
                if (element.pharmacyID == user.preferredPharmacy) {
                    setImgUrl('https://www.interiorfitouts.com.au/wp-content/uploads/2019/12/IMG_2984-HDR-scaled.jpg');
                    setFavouriteCardProps(element);
                }
            });
            defData1.forEach(element => {
                if (element.pharmacyID == user.preferredPharmacy) {
                    setImgUrl('https://www.franchisebusiness.com.au/app/uploads/2019/04/bigstock-Chemist-Warehouse-Australia-113332994-1920x1281.jpg');
                    setFavouriteCardProps(element);
                }
            });

        }
        if (!unmounted) {
            getData();
        }
        return () =>{
            unmounted = true;
        }
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{height: "90%"}}>
            <ScrollView style={styles.scrollView}>
                <View style={{ paddingTop: "5%" }}>
                    <Text style={styles.sectionTitle}>
                        Preferred Pharmacy
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
                    <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                        <View>
                            <Image
                                source={{
                                    uri: imgUrl,
                                }}
                                style={{
                                    height: 135,
                                    width: 300
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, width: "90%" }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {favouriteCardProps.name} </Text>
                            <Text style={{ color: "#777", paddingTop: 5 }}>
                                {favouriteCardProps.address}
                            </Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: "#777" }}>Contact No: {favouriteCardProps.contact_no}</Text>
                                <Text style={{ color: "#777", paddingLeft: '25%' }}> 0.5 km</Text>
                            </View>

                        </View>
                    </View>
                </View>
                {/* <FavouriteStoreCard user={user} /> */}
                <ClosestStoreList user={user} />
            </ScrollView>
            </View>
        </SafeAreaView>
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
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 30,
        color: '#00CBBC'
        // backgroundColor: '#00CBBC',
    },
});

export default HomePage;

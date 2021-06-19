import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, ScrollView, Alert, SafeAreaView, Image } from 'react-native'
import { Card } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import ClosestStoreList from './ClosestStoreList';
import { getAllStoreCwh, getAllStoreTwc } from '../services/storesService';
import NavHeader from './NavHeader';




const HomePage = ({ navigation, user }) => {

    const [favouriteCardProps, setFavouriteCardProps] = useState({});
    const [imgUrl, setImgUrl] = useState();

    useEffect(() => {
        let unmounted = false;
        let unmounted1 = false;
        async function getData() {
            const defData = await getAllStoreCwh();
            const defData1 = await getAllStoreTwc();
            if (!unmounted) {
                defData.forEach(element => {
                    if (element.pharmacyID == user.preferredPharmacy) {
                        if (!unmounted1) {
                            setImgUrl('https://www.interiorfitouts.com.au/wp-content/uploads/2019/12/IMG_2984-HDR-scaled.jpg');
                            setFavouriteCardProps(element);
                            return () => {
                                unmounted1 = true;
                            }
                        }
                    }
                });
                defData1.forEach(element => {
                    if (element.pharmacyID == user.preferredPharmacy) {

                        if (!unmounted1) {
                            setImgUrl('https://www.franchisebusiness.com.au/app/uploads/2019/04/bigstock-Chemist-Warehouse-Australia-113332994-1920x1281.jpg');
                            setFavouriteCardProps(element);
                            return () => {
                                unmounted1 = true;
                            }
                        }
                    }
                });
            }
            return () => {
                unmounted = true;
            }
        }
        if (!unmounted) {
            getData();
            return () => {
                unmounted = true;
            }
        }

    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <NavHeader {...navigation} title={"ChemDeliver"} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputStoreWrapper}>
                <TextInput style={styles.input} placeholder={'🔍    Search Medicine..'} />
                <Text style={styles.delStyle}>Delivering to</Text>
                <DropDownPicker style={styles.genderDD}
                    placeholder="Current Location"
                    placeholderStyle={{
                        color: "#b2b8b5",
                        fontSize: 14
                    }}
                    items={[
                        { label: 'Item 1', value: 'item1' },
                        { label: 'Item 2', value: 'item2' },
                    ]}
                    defaultIndex={0}
                    containerStyle={{ height: 40 }}
                    onChangeItem={item => console.log(item.label, item.value)}
                />
            </KeyboardAvoidingView>
            <ScrollView style={styles.scrollView}>
                <View style={{ paddingTop: "3%" }}>
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
                <ClosestStoreList user={user} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    },
    inputStoreWrapper: {
        position: 'relative',
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        paddingTop: '3%',
        paddingBottom: '2%'
    },
    input: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#00CBBC',
        borderWidth: 1,
        width: '50%'

    },
    genderDD: {
        width: "50%",
        marginTop: "1%",
        backgroundColor: "white",
        borderColor: "#00CBBC",
        borderRadius: 10,
        height: 40
    },
    delStyle: {
        paddingTop: 5,
        paddingLeft: 5,
        color: '#a8bdbb'
    }
});

export default HomePage;

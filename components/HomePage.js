import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, ScrollView, Alert, SafeAreaView, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import ClosestStoreList from './ClosestStoreList';
import OtherStoreList from './OtherStoresList';
import { getAllStoreCwh, getAllStoreTwc } from '../services/storesService';
import NavHeader from './NavHeader';

const HomePage = ({ navigation, user }) => {

    const [favouriteCardProps, setFavouriteCardProps] = useState({});
    const [imgUrl, setImgUrl] = useState();
    const [openDD, setOpenDD] = useState(false);
    const [locations, setLocations] = useState([
        { label: 'Current Location', value: 0 },
        { label: 'Other Stores', value: 1 }
    ]);
    const [selectedLocation, setSelectedLocation] = useState(0);

    const getData = async () => {
        const defData = await getAllStoreCwh();
        const defData1 = await getAllStoreTwc();
        if (defData) {
            for (let i = 0; i < defData.length; i++) {
                if (defData[i]) {
                    if (defData[i].pharmacyID == user.preferredPharmacy) {
                        return defData[i];
                    }
                }
            }
        }
        if (defData1) {
            for (let i = 0; i < defData1.length; i++) {
                if (defData1[i]) {
                    if (defData1[i].pharmacyID == user.preferredPharmacy) {
                        return defData1[i];
                    }
                }
            }
        }
    }

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        getData().then(data => {
            if (isMounted) {
                setFavouriteCardProps(data);    
                if (data.pharmacyID.substring(0, 3) == 'cwh') {
                    setImgUrl('https://www.franchisebusiness.com.au/app/uploads/2019/04/bigstock-Chemist-Warehouse-Australia-113332994-1920x1281.jpg');
                } else if (data.pharmacyID.substring(0, 3) == 'twc') {
                    setImgUrl('https://www.interiorfitouts.com.au/wp-content/uploads/2019/12/IMG_2984-HDR-scaled.jpg');
                }
            }
        })
        return () => { isMounted = false };

    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{height: "90%"}}>
                <NavHeader title={"ChemDeliver"} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inputStoreWrapper}>
                    <TextInput style={styles.input} placeholder={'🔍    Search Medicine..'} />
                    <Text style={styles.delStyle}>Delivering to</Text>
                    <DropDownPicker style={styles.genderDD}
                        open={openDD}
                        value={selectedLocation}
                        items={locations}
                        setOpen={setOpenDD}
                        setValue={setSelectedLocation}
                        setItems={setLocations}
                        placeholder="Current Location"
                        placeholderStyle={{
                            color: "#b2b8b5",
                            fontSize: 14
                        }}
                        dropDownContainerStyle={{
                            borderColor: "white",
                            fontSize: 14,
                            height: 40,
                            width: "50%",
                            backgroundColor: "#00CBBC",
                        }}
                    />
                </KeyboardAvoidingView>
                {selectedLocation == 0 && 
                <>
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
                </>}
                {selectedLocation==1 && 
                    <OtherStoreList user={user} />
                }
            </View>
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
        height: 40,
        marginBottom: "8%",
    },
    delStyle: {
        paddingTop: 5,
        paddingLeft: 5,
        color: '#a8bdbb'
    }
});

export default HomePage;

import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, ScrollView, Alert, Image, Button } from 'react-native'
import { Card } from 'react-native-elements'
import Dialog from "react-native-dialog";
import DropDownPicker from 'react-native-dropdown-picker';
import { createOrder } from '../services/ordersService'
import { getUserEHealth } from '../services/usersService';
import { getAllStoreCwh, getAllStoreTwc, getStoresByPostCodeCwh, getStoresByPostCodeTwc } from '../services/storesService'


const OrderForm = ({ user }) => {

    var mainUser = user.medicalId;
    var mainUserPost = user.postcode;
    const [storeId, setStoreId] = useState();
    const [prescNo, setPrescNo] = useState();
    const [favouriteCardProps, setFavouriteCardProps] = useState({});
    const [imgUrl, setImgUrl] = useState();
    const [openPPP, setOpenPPP] = useState(false);
    const [pp, setPP] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [visible, setVisible] = useState(false);


    const showSimpleAlert = (alertTitle, alertMsg) => {
        Alert.alert(alertTitle, alertMsg, [
            { text: "OK", onPress: () => console.log("ok Pressed") },
        ])
    }

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        setSelectedPharmacy(null);
        setVisible(false);
    };

    const handleSetOrder = async () => {
        try {
            var currentDateTime = new Date();
            var postCode = mainUserPost;
            var userId = mainUser;
            var orderId = userId + currentDateTime.getFullYear() + (currentDateTime.getMonth() + 1) + currentDateTime.getDate() + currentDateTime.getHours() + currentDateTime.getMinutes() + currentDateTime.getSeconds();
            var order = JSON.stringify({ "orderId": orderId, "userId": userId, "orderDate": currentDateTime, "storeId": storeId, "postCode": postCode, "prescriptionId": prescNo });
            await createOrder(order);
            Keyboard.dismiss();
            setStoreId(null);
            setPrescNo(null);
            showSimpleAlert("Purchased Successfully!", "Order Ref: " + orderId);
        } catch (error) {
            console.log(error);
        }
    }

    const getDataFromMedicareId = async () => {
        if (user.medicalId != '') {
            const data = await getUserEHealth(user.medicalId);
            if (data) {
                const address = data.address.split(', ');

                let storesCWH = await getStoresByPostCodeCwh(address[2]);
                let storesTWC = await getStoresByPostCodeTwc(address[2]);

                let stores = [];
                storesCWH?.map((store) => {
                    stores.push({
                        label: store.name + ", " + store.address,
                        value: store.pharmacyID
                    })
                });
                storesTWC?.map((store) => {
                    stores.push({
                        label: store.name + ", " + store.address,
                        value: store.pharmacyID
                    })
                });
                return stores;
            } else {

                let stores = [];
                return stores;
            }
        }
    }

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
        getDataFromMedicareId().then(data => {
            if (isMounted) setPP(data);
        })
        return () => { isMounted = false };

    }, []);


    return (
        <View style={styles.container}>
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
                <View style={styles.btnStore}>
                    <Button title="Change Pharmacy" color="#00CBBC" onPress={showDialog} />
                </View>
                <Dialog.Container visible={visible} headerStyle={styles.hdlgStore}>
                    <Dialog.Title>Change Preferred Pharmacy</Dialog.Title>
                    <Dialog.Description>
                        Select your Preferred Pharmacy from drop down.
                    </Dialog.Description>
                    <DropDownPicker style={styles.genderDD}
                        open={openPPP}
                        value={selectedPharmacy}
                        items={pp}
                        setOpen={setOpenPPP}
                        setValue={setSelectedPharmacy}
                        setItems={setPP}
                        placeholder="Preferred Pharmacy"
                        placeholderStyle={{
                            color: "#b2b8b5",
                            fontSize: 13
                        }}
                        dropDownContainerStyle={{
                            borderColor: "white",
                            fontSize: 12
                        }}
                    />
                    <Dialog.Button label="Ok" onPress={handleOk} bold={'ture'} />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                </Dialog.Container>

                <Card>
                    <Card.Title style={{
                        color: '#00CBBC',
                        width: '100%',
                        fontSize: 17
                    }}
                    >Presciption Details</Card.Title>
                    <Card.Divider />
                    <View style={styles.btnPresc}>
                        <Button title="Attach Prescription" color="#00CBBC" onPress={showDialog} />
                    </View>
                    <Dialog.Container visible={visible} headerStyle={styles.hdlgPresc}>
                        <Dialog.Title>Prescription</Dialog.Title>
                        <Dialog.Description>
                            Select a Prescription ID.
                        </Dialog.Description>
                        <DropDownPicker style={styles.genderDD}
                            open={openPPP}
                            value={selectedPharmacy}
                            items={pp}
                            setOpen={setOpenPPP}
                            setValue={setSelectedPharmacy}
                            setItems={setPP}
                            placeholder="Select Prescription"
                            placeholderStyle={{
                                color: "#b2b8b5",
                                fontSize: 11
                            }}
                            dropDownContainerStyle={{
                                borderColor: "white",
                                fontSize: 12
                            }}
                        />
                        <Dialog.Button label="Ok" onPress={handleOk} bold={'ture'} />
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                    </Dialog.Container>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.inputStoreWrapper}>
                        <TextInput style={styles.inputPresc} placeholder={'Prescription No'} value={storeId} onChangeText={text => setStoreId(text)} />
                        {/* <TextInput style={styles.input} placeholder={'Enter Pres. No.'} value={prescNo} onChangeText={text => setPrescNo(text)} /> */}
                    </KeyboardAvoidingView>
                    {/* <Card.Divider /> */}
                    <Card.Title style={{
                        color: '#00CBBC',
                        width: '100%',
                        fontSize: 17
                    }}
                    >Medicine Details</Card.Title>
                    <Card.Divider />
                    <View style={styles.ordBtn}>

                    </View>
                </Card>

                <Card style={styles.order}>
                    <Card.Title style={{
                        color: '#00CBBC',
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
            </ScrollView >
        </View >

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
        borderColor: '#00CBBC',
        borderWidth: 1,
        width: '40%'

    },
    inputPresc: {
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: '#FFF8DC',
        borderRadius: 20,
        borderColor: '#00CBBC',
        borderWidth: 1,
        width: '80%',
        marginTop: '3%'

    },
    searchWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#00CBBC',
        borderWidth: 1,

    },
    textOnSearch: {
        fontSize: 25
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 30,
        color: '#00CBBC'
    },
    genderDD: {
        width: "60%",
        marginBottom: "5%",
        backgroundColor: "white",
        paddingLeft: "10%",
        borderColor: "#00CBBC",
        borderRadius: 20,
        marginLeft: "5%",
        height: 40
    },
    btnStore: {
        marginTop: '5%',
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btnPresc: {
        marginTop: '1%',
        marginBottom: '2%',
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    hdlgStore: {
        height: '35%'
    }
});

export default OrderForm;

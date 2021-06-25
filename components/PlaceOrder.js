import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, ScrollView, Alert, Image, SafeAreaView } from 'react-native'
import { Card } from 'react-native-elements'
import Dialog from "react-native-dialog";
import DropDownPicker from 'react-native-dropdown-picker';
import MedicineCard from './MedicineCard';
import { createOrder, updateUserStore } from '../services/ordersService'
import { getUserEHealth } from '../services/usersService';
import { getAllStoreCwh, getAllStoreTwc, getStoresByPostCodeCwh, getStoresByPostCodeTwc } from '../services/storesService'
import { getList, getSpecificPresc } from '../services/PrescriptionService';
import NavHeader from './NavHeader';
import { Button } from 'native-base';


const PlaceOrder = ({ user, meds, addingMedicine, removingMedicine }) => {

    var mainUser = user.medicalId;
    var mainUserPost = user.postcode;
    const [prescNo, setPrescNo] = useState();
    const [openPrP, setOpenPrP] = useState(false);
    const [pr, setPr] = useState([]);
    const [selectedPresc, setSelectedPresc] = useState(null);
    const [visible1, setVisible1] = useState(false);
    const [medicines, setMedicines] = useState();
    const [price, setPrice] = useState();
    const [tp, setTp] = useState(10);    
    
    useEffect(() => {
        let isMounted = true;               // note mutable flag
        getPrescData().then(data => {
            if (isMounted) setPr(data);
        })
        return () => { isMounted = false };
    }, []);

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        let totalPrice = 0;
        meds.map((med) => {
            totalPrice += (med.price * med.qty)
        });
        setPrice(totalPrice.toFixed(2));
        setTp((totalPrice + 10).toFixed(2));
        return () => { isMounted = false };
    }, [meds]);


    const showSimpleAlert = (alertTitle, alertMsg, order) => {
        Alert.alert(alertTitle, alertMsg, [
            { text: "OK", onPress: () => console.log(order) },
        ])
    }

    const showPrescDialog = () => {
        setVisible1(true);
    }

    const handlePrescCancel = () => {
        setSelectedPresc(null);
        setVisible1(false);
    };

    const handlePrescOk = async () => {
        let prescNo = selectedPresc.toString();
        setPrescNo(prescNo);
        setVisible1(false);
        getDrugData();
        setSelectedPresc(null);
    };

    const handleSetOrder = async () => {
        try {
            var currentDateTime = new Date();
            var postCode = mainUserPost;
            var userId = mainUser;
            var orderId = "#" + userId + currentDateTime.getFullYear() + (currentDateTime.getMonth() + 1) + currentDateTime.getDate() + currentDateTime.getHours() + currentDateTime.getMinutes() + currentDateTime.getSeconds();
            var order = JSON.stringify({ "orderId": orderId, "userId": userId, "orderDate": currentDateTime, "storeId": storeId, "postCode": postCode, "prescriptionId": prescNo });
            await createOrder(order);
            Keyboard.dismiss();
            setPrescNo(null);
            setMedicines(null)
            showSimpleAlert("Purchased Successfully!", "Order Ref: " + orderId, order);
        } catch (error) {
            console.log(error);
        }
    }

    const getPrescData = async () => {
        if (user.medicalId != '') {
            const data = await getList(user.medicalId);
            if (data) {
                let prescriptions = [];
                data?.map((presc) => {
                    prescriptions.push({
                        label: presc.script_id + "- " + presc.description,
                        value: presc.script_id
                    })
                });
                return prescriptions;
            } else {

                let prescriptions = [];
                return prescriptions;
            }
        }
    }

    const getDrugData = async () => {

        if (selectedPresc) {
            const medData = await getSpecificPresc(selectedPresc);
            let drugsData;
            if (!medData) {
                drugsData = {};
            } else {
                drugsData = JSON.parse(medData[0].drugs);
                drugsData.map((data)=> {
                    if(data.dir != undefined) {
                        addingMedicine({
                            dir: data.dir,
                            name: data.name,
                            qty: parseInt(data.qty),
                            price: parseFloat(Math.random().toFixed(2))
                        })
                    }
                })
                
            }
            return drugsData;

        } else {
            let drugData = [{}];
            return drugData;
        }

    }

    const precMedicines = () => {
        if (meds.length != 0) {
            const precMedicines = meds.map((drug, i) => {

                return (
                    <View style={styles.medItems} key={i.toString()}>
                        <MedicineCard medicine={drug} addingMedicine={addingMedicine} removingMedicine={removingMedicine} />
                    </View>
                )
            });
            return precMedicines;
        }
        else {
            return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{height: "90%"}}>
                <NavHeader title={"Place Order"}/>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Card style={{ width: '90%' }}>
                            <Card.Title style={{
                                color: '#00CBBC',
                                width: '100%',
                                fontSize: 17,
                                textAlign: 'left'
                            }}>
                                Default Address {'\n'}
                                <Text style={{
                                    color: 'black',
                                    fontSize: 14
                                }}>
                                    {user.unit} {user.streetAddress}, {user.suburb} {user.postcode}
                                </Text>{'\n'}{'\n'}
                                Delivery Date {'\n'}
                                <Text style={{
                                    color: 'black',
                                    fontSize: 14
                                }}>
                                    {(new Date()).toDateString()}
                                </Text>{'\n'}{'\n'}
                                Time {'\n'}
                                <Text style={{
                                    color: 'black',
                                    fontSize: 14
                                }}>
                                    14:30
                                </Text>
                            </Card.Title>
                            <Card.Divider />
                            <Card.Title style={{
                                color: '#00CBBC',
                                width: '100%',
                                fontSize: 17
                            }}

                            >Medicine Details</Card.Title>
                            <View style={styles.medStoreWrapper}>
                                {precMedicines()}
                            </View>
                        </Card>

                        <Button style={styles.btnPresc} onPress={showPrescDialog}>
                            <Text style={{color: "white", fontSize: 16}}>Attach Prescription</Text>
                        </Button>

                        <Dialog.Container visible={visible1} headerStyle={styles.hdlgPresc}>
                            <Dialog.Title>Prescription</Dialog.Title>
                            <Dialog.Description>
                                Select a Prescription ID.
                            </Dialog.Description>
                            <DropDownPicker style={styles.genderDD}
                                open={openPrP}
                                value={selectedPresc}
                                items={pr}
                                setOpen={setOpenPrP}
                                setValue={setSelectedPresc}
                                setItems={setPr}
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
                            <Dialog.Button label="Ok" onPress={handlePrescOk} />
                            <Dialog.Button label="Cancel" onPress={handlePrescCancel} />
                        </Dialog.Container>

                        <Card>
                            <Card.Title style={{
                                color: '#551FC4',
                                width: '100%',
                                fontSize: 17,
                                textAlign: 'left'
                            }}
                            >Delivery Instructions</Card.Title>
                            <Card.Divider />
                            
                            <View style={styles.medStoreWrapper}>
                                <Text style={{
                                    color: '#00CBBC',
                                    width: '100%',
                                    fontSize: 17,
                                    paddingLeft: '10%',
                                    paddingBottom: '5%'
                                }}>SubTotal: {'\t\t\t'}$ {price} AUD</Text>
                                <Text style={{
                                    color: '#00CBBC',
                                    width: '100%',
                                    fontSize: 17,
                                    paddingLeft: '10%',
                                    paddingBottom: '5%'
                                }}>Delivery Cost: {'\t\t'}$ 10.00 AUD</Text>
                                <Text style={{
                                    color: '#00CBBC',
                                    width: '100%',
                                    fontSize: 17,
                                    paddingLeft: '10%',
                                    paddingBottom: '5%'
                                }}>{'\t\t\t\t\t'}$ {tp} AUD</Text>
                            </View>

                            <Button style={styles.btnPresc} onPress={() => {handleSetOrder()}}>
                                <Text style={{color: "white", fontSize: 16}}>Checkout</Text>
                            </Button>
                        </Card>
                    </ScrollView >
                </View >
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    },
    btnPresc: {
        marginTop: '5%',
        marginBottom: '2%',
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#551FC4"
    },
    container: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    medStoreWrapper: {
        paddingHorizontal: 2,
    },
    hdlgPresc: {
        height: '35%'
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
    medItems: {
        marginTop: 10,
    }
});

export default PlaceOrder;

import React, { useState } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Input, Item, Button, Toast, Root, Spinner } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUser } from '../services/usersService';
import { Base64 } from 'js-base64';
import  { getUserEHealth } from '../services/usersService';
import DropDownPicker from 'react-native-dropdown-picker';
import { getStoresByPostCodeCwh, getStoresByPostCodeTwc } from '../services/storesService';

function Signup({ navigation }) {
    const [user, setUser] = useState({
        fName: '',
        lName: '',
        medicalId: '',
        phnNumber: '',
        pPharmacy: '',
        unit: '',
        sAddress: '',
        suburb: '',
        state: '',
        postcode: '',
        password: '',
        cPassword: '',
        gender: '',
        dob: ''
    });
    const [isPartTwoVisible, setIsPartTwoVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openGP, setOpenGP] = useState(false);
    const [gender, setGender] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [openPPP, setOpenPPP] = useState(false);
    const [pp, setPP] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    const clickNext = () => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if(user.medicalId == '' || user.fName == '' || user.lName == '' || user.phnNumber == '' || !selectedGender || user.dob == '' ) {
            Toast.show({
                text: "Please fill the above fields!",
                buttonText: "Okay",
                duration: 3000,
                type: "danger",
                position: "bottom"
            });
        } else if (!regex.test(user.dob)) {
            Toast.show({
                text: "Please enter a valid date of birth!",
                buttonText: "Okay",
                duration: 3000,
                type: "danger",
                position: "bottom"
            });
        } else {
            setIsPartTwoVisible(true);
        }
    }

    const signup = async () => {
        try {
            setIsLoading(true);
            if (user.unit != '' && user.sAddress != '' && user.suburb != '' && user.state != '' && user.postcode != '' 
                                    && user.postcode != '' && user.password != '' && (user.password == user.cPassword)) {
                let updatedUser = {
                    fName: user.fName,
                    lName: user.lName,
                    medicalId: user.medicalId,
                    phnNumber: user.phnNumber,
                    pPharmacy: selectedPharmacy? selectedPharmacy : '',
                    unit: user.unit,
                    sAddress: user.sAddress,
                    suburb: user.suburb,
                    state: user.state,
                    postcode: user.postcode,
                    password: Base64.encode(user.password),
                    gender: selectedGender,
                    dob: user.dob
                }
                if (await createUser(updatedUser)) {
                    Toast.show({
                        text: "User Created!",
                        buttonText: "Okay",
                        duration: 3000,
                        type: "success",
                        position: "bottom"
                    })
                    setIsLoading(false);
                } else {
                    Toast.show({
                        text: "There was an error while creating a user! Please try again",
                        buttonText: "Okay",
                        duration: 3000,
                        type: "danger",
                        position: "bottom"
                    })
                    setIsLoading(false);
                }
                navigation.navigate("Login");
            } else {
                Toast.show({
                    text: "Please enter all fields to proceed!",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger",
                    position: "bottom"
                })
                setIsLoading(false);
            }
        } catch (err) {
            Toast.show({
                text: "There was an error while creating a user! Please try again",
                buttonText: "Okay",
                duration: 3000,
                type: "danger",
                position: "bottom"
            })
            setIsLoading(false);
        }
    }

    const getDataFromMedicareId = async () => {
        if(user.medicalId != '') {
            const data = await getUserEHealth(user.medicalId);
            if(data){
                const address = data.address.split(', ');
                setUser({
                    fName: data.firstName,
                    lName: data.lastName,
                    medicalId: data.medicare_number,
                    phnNumber: data.telephoneNumber.toString(),
                    pPharmacy: '',
                    unit: address[0].split(' ')[0],
                    sAddress:  address[0].split(' ')[1],
                    suburb: address[1],
                    state: '',
                    postcode: address[2],
                    password: '',
                    cPassword: '',
                    gender: '',
                    dob: '' 
                });

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
                setPP(stores);
            } else {
                setUser({
                    fName: '',
                    lName: '',
                    medicalId: user.medicalId,
                    phnNumber: '',
                    pPharmacy: '',
                    unit: '',
                    sAddress:  '',
                    suburb: '',
                    state: '',
                    postcode: '',
                    password: '',
                    cPassword: '',
                    gender: '',
                    dob: '' 
                });

                let stores = [];
                setPP(stores);
            }
        }
    }

    return (
        <Root>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.signupTxt}>Sign Up</Text>
                    <Text style={styles.signupSubtitleTxt}>Add your details to sign up</Text>

                    {isLoading &&
                        <Spinner color='#00CBBC' />
                    }

                    {!isPartTwoVisible && !isLoading &&
                        <>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="Medicare Id"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.medicalId}
                                    onChangeText={medicalId => setUser({ ...user, medicalId: medicalId })}
                                    onEndEditing={getDataFromMedicareId}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="First Name"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.fName}
                                    onChangeText={fName => setUser({ ...user, fName: fName })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="Last Name"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.lName}
                                    onChangeText={lName => setUser({ ...user, lName: lName })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    keyboardType='numeric'
                                    placeholder="Phone Number"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.phnNumber}
                                    onChangeText={phnNumber => setUser({ ...user, phnNumber: phnNumber })}
                                />
                            </Item>
                            <DropDownPicker style={styles.genderDD}
                                open={openGP}
                                value={selectedGender}
                                items={gender}
                                setOpen={setOpenGP}
                                setValue={setSelectedGender}
                                setItems={setGender}
                                placeholder="Gender"
                                placeholderStyle={{
                                    color: "#b2b8b5",
                                    fontSize: 18
                                }}
                                dropDownContainerStyle={{
                                    borderColor: "white",
                                    fontSize: 18
                                }}
                                dropDownDirection="TOP"
                            />
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="Date of Birth (YYYY-MM-DD)"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.dob}
                                    onChangeText={dob => setUser({ ...user, dob: dob })}
                                />
                            </Item>
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
                                    fontSize: 18
                                }}
                                dropDownContainerStyle={{
                                    borderColor: "white",
                                    fontSize: 18
                                }}
                            />
                            <Button
                                rounded
                                block
                                style={styles.nextBtn}
                                onPress={clickNext}
                            >
                                <Text style={styles.nextTxt}>Next</Text>
                            </Button>
                            <Text style={styles.login}>Already have an Account? <Text style={styles.loginTxt} onPress={() => { navigation.navigate("Login") }}>Login</Text></Text>
                        </>
                    }
                    {!isLoading && isPartTwoVisible &&
                        <>
                            <Text style={styles.addressTxt}>Delivery Address</Text>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="Unit"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.unit}
                                    onChangeText={unit => setUser({ ...user, unit: unit })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="Street Address"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.sAddress}
                                    onChangeText={sAddress => setUser({ ...user, sAddress: sAddress })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="Suburb"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.suburb}
                                    onChangeText={suburb => setUser({ ...user, suburb: suburb })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    placeholder="State"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.state}
                                    onChangeText={state => setUser({ ...user, state: state })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    keyboardType='numeric'
                                    placeholder="Postcode"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.postcode}
                                    onChangeText={postcode => setUser({ ...user, postcode: postcode })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    secureTextEntry
                                    placeholder="Password"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.password}
                                    onChangeText={password => setUser({ ...user, password: password })}
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{ paddingLeft: "10%" }}
                                    secureTextEntry
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.cPassword}
                                    onChangeText={cPassword => setUser({ ...user, cPassword: cPassword })}
                                />
                            </Item>
                            <Button
                                rounded
                                block
                                style={styles.signupBtn}
                                onPress={async () => { await signup() }}
                            >
                                <Text style={styles.nextTxt}>Sign in</Text>
                            </Button>
                        </>
                    }
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </Root>
    )
}

const styles = StyleSheet.create({
    signupTxt: {
        letterSpacing: 0,
        lineHeight: 30,
        fontSize: 30,
        marginTop: "5%",
        color: "#00CBBC",
        fontWeight: "bold"
    },
    signupSubtitleTxt: {
        letterSpacing: 0,
        lineHeight: 14,
        marginTop: "2%",
        fontSize: 14,
        color: "#7C7D7E",
        marginBottom: "5%"
    },
    input: {
        width: "90%",
        marginTop: "3%",
        backgroundColor: "white",
        borderColor: "white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    nextBtn: {
        backgroundColor: "black",
        height: "8.3%",
        marginTop: "5%",
    },
    nextTxt: {
        letterSpacing: 0,
        lineHeight: 40,
        fontSize: 30,
        color: "white",
    },
    login: {
        marginTop: "2%"
    },
    loginTxt: {
        color: "#00CBBC",
    },
    addressTxt: {
        textAlign: "left",
        color: "#00CBBC",
        fontSize: 16,
        marginTop: "2%",
    },
    signupBtn: {
        backgroundColor: "#00CBBC",
        height: "8.3%",
        marginTop: "5%",
    },
    genderDD: {
        width: "90%",
        marginTop: "3%",
        backgroundColor: "white",
        paddingLeft: "10%", 
        borderColor: "white", 
        borderRadius: 50,
        marginLeft: "5%"
    }
})

export default Signup;

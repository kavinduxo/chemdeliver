import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Item, Button, DatePicker, Picker, Grid, Col, Container } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

function Signup ({ navigation }) {
    const [user, setUser] = useState({
        fName: '',
        lName: '',
        gender: '',

        loading: false,
        dob: new Date()
    });
    const [isPartTwoVisible, setIsPartTwoVisible] = useState(false);

    const signup = () => {
        navigation.navigate("Login")
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.signupTxt}>Sign Up</Text>
                <Text style={styles.signupSubtitleTxt}>Add your details to sign up</Text>
                
                {!isPartTwoVisible ? (
                    <>
                        <Item rounded style={styles.input}>
                            <Input style={{paddingLeft: "10%"}}
                                placeholder="First Name"
                                placeholderTextColor="#b2b8b5"
                                value={user.fName}
                                onChangeText={fName => setUser({...user, fName: fName})}        
                            />
                        </Item>
                        <Item rounded style={styles.input}>
                            <Input style={{paddingLeft: "10%"}}
                                placeholder="Last Name"
                                placeholderTextColor="#b2b8b5"
                                value={user.lName}
                                onChangeText={lName => setUser({...user, lName: lName})}        
                            />
                        </Item>
                        <Item rounded style={{height: "8.3%", width: "90%", marginTop: "2%"}}>
                            <Picker
                                mode="dropdown"
                                placeholder="Gender"
                                placeholderStyle={{ paddingLeft: "10%", color: "#b2b8b5" }}
                                placeholderIconColor="#007aff"
                                style={{ width: "100%" }}   
                                onValueChange={gender => setUser({...user, gender: gender})}   
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </Item>
                        <Item rounded style={{height: "8.3%", width: "90%", marginTop: "2%"}}>
                            <DatePicker 
                                value={user.dob}
                                onDateChange={dob => setUser({...user, dob: dob})}
                                placeHolderText="Date of Birth"
                                placeHolderTextStyle={{ color: "#b2b8b5", paddingLeft: "10%" }}
                            />
                        </Item>
                        <Item rounded style={styles.input}>
                            <Input style={{paddingLeft: "10%"}}
                                placeholder="Medical Id (optional)"
                                placeholderTextColor="#b2b8b5"
                                value={user.medicalId}
                                onChangeText={medicalId => setUser({...user, medicalId: medicalId})}        
                            />
                        </Item>
                        <Item rounded style={styles.input}>
                            <Input style={{paddingLeft: "10%"}}
                                keyboardType = 'numeric'
                                placeholder="Phone Number"
                                placeholderTextColor="#b2b8b5"
                                value={user.phnNumber}
                                onChangeText={phnNumber => setUser({...user, phnNumber: phnNumber})}        
                            />
                        </Item>
                        <Button
                            rounded
                            block
                            style={styles.nextBtn}
                            onPress={() => {setIsPartTwoVisible(true)}}
                        >
                            <Text style={styles.nextTxt}>Next</Text>
                        </Button>
                        <Text style={styles.login}>Already have an Account? Login <Text style={styles.loginTxt} onPress={() => {navigation.navigate("Login")}}>Login</Text></Text>
                    </>
                ) : (
                    <>
                        <Item rounded style={styles.input}>
                            <Input style={{paddingLeft: "10%"}}
                                placeholder="Preferred Pharmacy"
                                placeholderTextColor="#b2b8b5"
                                value={user.pPharmacy}
                                onChangeText={pPharmacy => setUser({...user, pPharmacy: pPharmacy})}        
                            />
                        </Item>
                        <Text style={styles.addressTxt}>Delivery Address</Text>
                        <View style={styles.row}>
                            <Item rounded style={styles.addressInp}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Unit"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.unit}
                                    onChangeText={unit => setUser({...user, unit: unit})}        
                                />
                            </Item>
                            <Item rounded style={styles.addressInp}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Street Address"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.sAddress}
                                    onChangeText={sAddress => setUser({...user, sAddress: sAddress})}        
                                />
                            </Item>
                        </View>
                        <Item rounded style={styles.inp1}>
                            <Input style={{paddingLeft: "10%"}}
                                placeholder="Suburb"
                                placeholderTextColor="#b2b8b5"
                                value={user.suburb}
                                onChangeText={suburb => setUser({...user, suburb: suburb})}        
                            />
                        </Item>
                        <Item rounded style={styles.inp1}>
                            <Input style={{paddingLeft: "10%"}}
                                placeholder="State"
                                placeholderTextColor="#b2b8b5"
                                value={user.state}
                                onChangeText={state => setUser({...user, state: state})}        
                            />
                        </Item>
                        <Item rounded style={styles.inp1}>
                            <Input style={{paddingLeft: "10%"}}
                                keyboardType = 'numeric'
                                placeholder="Postcode"
                                placeholderTextColor="#b2b8b5"
                                value={user.postcode}
                                onChangeText={postcode => setUser({...user, postcode: postcode})}        
                            />
                        </Item>
                        <Item rounded style={styles.inp1}>
                            <Input style={{paddingLeft: "10%"}}
                                secureTextEntry
                                placeholder="Password"
                                placeholderTextColor="#b2b8b5"
                                value={user.password}
                                onChangeText={password => setUser({...user, password: password})}        
                            />
                        </Item>
                        <Item rounded style={styles.inp1}>
                            <Input style={{paddingLeft: "10%"}}
                                secureTextEntry
                                placeholder="Confirm Password"
                                placeholderTextColor="#b2b8b5"
                                value={user.cPassword}
                                onChangeText={cPassword => setUser({...user, cPassword: cPassword})}        
                            />
                        </Item>
                        <Button
                            rounded
                            block
                            style={styles.signupBtn}
                            onPress={() => {signup()}}
                        >
                            <Text style={styles.nextTxt}>Sign in</Text>
                        </Button>
                    </>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    signupTxt: {
        letterSpacing: 0,
        lineHeight: 30,
        fontSize: 30,
        marginTop: "2%",
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
        marginTop: "2%",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    nextBtn: {
        backgroundColor: "black",
        height: "8.3%",
        marginTop: "25%",      
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
    row: {
        flex: 1,
        flexDirection: "row"
    },
    addressInp: {
        width: "50%",
        marginTop: "2%",
        height: 50
    },
    inp1: {
        width: "90%",
        marginTop: "2%",
        height: 50,
    },
    signupBtn: {
        backgroundColor: "#00CBBC",
        height: "8.3%",
        marginTop: "18%",
    }   
})

export default Signup;
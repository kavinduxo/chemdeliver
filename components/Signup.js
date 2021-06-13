import React, { useState } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Item, Button, Toast, Root, Spinner  } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUser } from '../services/usersService';
import { Base64 } from 'js-base64';

function Signup ({ navigation }) {
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
        cPassword: ''
    });
    const [isPartTwoVisible, setIsPartTwoVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async () => {
        try{
            setIsLoading(true);
            if (user?.medicalId && user?.password && (user?.password == user?.cPassword)){
                let updatedUser = {
                    fName: user.fName,
                    lName: user.lName,
                    medicalId: user.medicalId,
                    phnNumber: user.phnNumber,
                    pPharmacy: user.pPharmacy,
                    unit: user.unit,
                    sAddress: user.sAddress,
                    suburb: user.suburb,
                    state: user.state,
                    postcode: user.postcode,
                    password: Base64.encode(user.password)
                }
                if (await createUser(updatedUser)){
                    Toast.show({
                        text: "User Created!",
                        buttonText: "Okay",
                        duration: 3000,
                        type: "success",
                        position: "bottom"
                    })
                    setIsLoading(false);
                }
                Toast.show({
                    text: "There was an error while creating a user! Please try again",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger",
                    position: "bottom"
                })
                setIsLoading(false);
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
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <Root>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.signupTxt}>Sign Up</Text>
                    <Text style={styles.signupSubtitleTxt}>Add your details to sign up</Text>

                    {isLoading &&
                        <Spinner color='#00CBBC'/>
                    }
                    
                    {!isPartTwoVisible && !isLoading &&
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
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Medical Id"
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
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Preferred Pharmacy"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.pPharmacy}
                                    onChangeText={pPharmacy => setUser({...user, pPharmacy: pPharmacy})}        
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
                            <Text style={styles.login}>Already have an Account? <Text style={styles.loginTxt} onPress={() => {navigation.navigate("Login")}}>Login</Text></Text>
                        </>
                    }
                    {!isLoading && isPartTwoVisible &&           
                        <>
                            <Text style={styles.addressTxt}>Delivery Address</Text>
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Unit"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.unit}
                                    onChangeText={unit => setUser({...user, unit: unit})}        
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Street Address"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.sAddress}
                                    onChangeText={sAddress => setUser({...user, sAddress: sAddress})}        
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="Suburb"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.suburb}
                                    onChangeText={suburb => setUser({...user, suburb: suburb})}        
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    placeholder="State"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.state}
                                    onChangeText={state => setUser({...user, state: state})}        
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    keyboardType = 'numeric'
                                    placeholder="Postcode"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.postcode}
                                    onChangeText={postcode => setUser({...user, postcode: postcode})}        
                                />
                            </Item>
                            <Item rounded style={styles.input}>
                                <Input style={{paddingLeft: "10%"}}
                                    secureTextEntry
                                    placeholder="Password"
                                    placeholderTextColor="#b2b8b5"
                                    value={user.password}
                                    onChangeText={password => setUser({...user, password: password})}        
                                />
                            </Item>
                            <Item rounded style={styles.input}>
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
                                onPress={async() => {await signup()}}
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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    nextBtn: {
        backgroundColor: "black",
        height: "8.3%",
        marginTop: "30%",      
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
    }   
})

export default Signup;

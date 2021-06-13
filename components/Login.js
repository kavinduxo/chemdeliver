import React, { useState } from 'react';
import {Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Input, Item, Button, Spinner} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

function Login ({ login, navigation, isLoading }) {
    const [user, setUser] = useState({
        userId: '',
        password: ''
    });

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}> 
                <Text style={styles.loginTxt}>Login</Text>
                <Text style={styles.loginSubtitleTxt}>Add your details to login</Text>
                {isLoading ? 
                        <Spinner color='#00CBBC'/>
                : (
                    <>
                        <Item rounded style={styles.input}>
                            <Input style={{textAlign: "center"}}
                                placeholder="User Id"
                                placeholderTextColor="#b2b8b5"
                                value={user.userId}
                                onChangeText={userId => setUser({...user, userId: userId})}        
                            />
                        </Item>
                        <Item rounded style={styles.input}>
                            <Input style={{textAlign: "center"}}
                                secureTextEntry
                                placeholder="Password"
                                placeholderTextColor="#b2b8b5"
                                value={user.password}
                                onChangeText={password => setUser({...user, password: password})}        
                            />
                        </Item>
                        <Button
                            rounded
                            block
                            style={styles.loginBtn}
                            onPress={async () => {await login(user)}}
                        >
                            <Text style={styles.login}>Login</Text>
                        </Button>
                        <Text style={styles.signup}>Don't have an Account? <Text style={styles.signupTxt} onPress={() => {navigation.navigate("Signup")}}>Sign Up</Text></Text>
                    </>
                )}
                
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    loginTxt: {
        letterSpacing: 0,
        lineHeight: 30,
        marginTop: "20%",
        fontSize: 30,
        color: "#00CBBC",
        fontWeight: "bold"
    },
    loginSubtitleTxt: {
        letterSpacing: 0,
        lineHeight: 14,
        marginTop: "5%",
        fontSize: 14,
        color: "#7C7D7E",
        marginBottom: "30%"
    },
    input: {
        width: "90%",
        marginTop: "5%"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    loginBtn: {
        backgroundColor: "#00CBBC",
        height: "8%",
        marginTop: "10%"
    },
    login: {
        letterSpacing: 0,
        lineHeight: 40,
        fontSize: 30,
        color: "white",
    },
    signup: {
        marginTop: "2%"
    },
    signupTxt: {
        color: "#00CBBC",
    }    
})

export default Login;

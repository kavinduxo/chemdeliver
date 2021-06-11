import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Item, Button} from 'native-base';

function Login ({ login }) {
    const [user, setUser] = useState({
        userId: '',
        password: '',
        loading: false
    });

    return(
        <View style={styles.container}>
            <Text style={styles.loginTxt}>Login</Text>
            <Text style={styles.loginSubtitleTxt}>Add your details to login</Text>
            <Item rounded style={styles.input}>
                <Input style={{textAlign: "center"}}
                    placeholder="User Id"
                    value={user.userId}
                    onChangeText={userId => setUser({...user, userId: userId})}        
                />
            </Item>
            <Item rounded style={styles.input}>
                <Input style={{textAlign: "center"}}
                    secureTextEntry
                    placeholder="Password"
                    value={user.password}
                    onChangeText={password => setUser({...user, password: password})}        
                />
            </Item>
            <Button
                rounded
                block
                style={styles.loginBtn}
                onPress={() => {login(user)}}
            >
                <Text style={styles.login}>Login</Text>
            </Button>
            <Text style={styles.signup}>Don't have an Account? Sign Up</Text>
        </View>
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
    }    
})

export default Login;

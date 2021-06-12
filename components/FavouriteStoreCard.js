import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'


function FavouriteStoreCard(props) {

    const [postCode, setPostCode]= useState();

    const handleSetStore = () => {
        // console.log(postCode);
        Keyboard.dismiss();
        setPostCode(null);
    }

    return (
        <Card>
            <Card.Title style={{
                color: '#66667E',
                width: 300 
            }}
            >Favourite Store ID: {props.storeId}</Card.Title>
            <Card.Divider />
            <Text style={{
                marginBottom: 5,
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                {props.address}
            </Text>
            <Text style={{
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center"
            }}>
                {props.storeName}
            </Text>


            <View style={{
                flexDirection: "column",
                height: 70,
                padding: 10,
                justifyContent: "space-around",
                borderRadius: 15,
                width: '100%'
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        marginBottom: 10,
                        color: "#153E73",
                        fontWeight: "bold",
                    }}>
                        Postcode: {props.postCode}
                    </Text>
                    <Text style={{
                        marginBottom: 10,
                        color: "#153E73",
                        fontWeight: "bold",
                    }}>
                        Contact: {props.contact}
                    </Text>
                </View>
            </View>
            <Card.Divider />
            <Card.Title style={{
                color: '#66667E',
                width: '100%' 
            }}
            >Change Favourite</Card.Title>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputStoreWrapper}>
                <TextInput style={styles.input} placeholder={'Enter a postcode..'} value={postCode} onChangeText={text => setPostCode(text)}/>
                <TouchableOpacity onPress={() => handleSetStore()}>
                    <View style={styles.searchWrapper}>
                        <Text style={styles.textOnSearch}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Card>
    )
}

const styles = StyleSheet.create({
    inputStoreWrapper: {
        position: 'relative',
        bottom: '7%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: '7%'
    },
    input: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        borderColor: '#2F4F4F',
        borderWidth: 1,
        width: '60%'

    },
    searchWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF8DC',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2F4F4F',
        borderWidth: 1,

    },
    textOnSearch: {
        fontSize: 25
    }

});
export default FavouriteStoreCard;
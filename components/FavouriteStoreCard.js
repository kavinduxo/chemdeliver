import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { getStoreByIdCwh, getStoreByIdTwc } from '../services/storesService';


function FavouriteStoreCard(props) {
  
    const [storeId, setStoreId] = useState();
    const [favouriteCardProps, setFavouriteCardProps] = useState({});
    const handleSetStore = async () => {
        try {
            var favCard = await getStoreByIdCwh(storeId)
            setFavouriteCardProps(favCard);
            console.log(favouriteCardProps);
            setStoreId(null);
            Keyboard.dismiss();
            
        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <Card>
            <Card.Title style={{
                color: '#66667E',
                width: 300
            }}
            >Favourite Store ID: {favouriteCardProps.pharmacyID}</Card.Title>
            <Card.Divider />
            <Text style={{
                marginBottom: 5,
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                {favouriteCardProps.address}
            </Text>
            <Text style={{
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center"
            }}>
                {favouriteCardProps.name}
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
                        Postcode: {favouriteCardProps.postcode}
                    </Text>
                    <Text style={{
                        marginBottom: 10,
                        color: "#153E73",
                        fontWeight: "bold",
                    }}>
                        Contact: {favouriteCardProps.contact_no}
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
                <TextInput style={styles.input} placeholder={'Enter a store ID..'} value={storeId} onChangeText={text => setStoreId(text)} />
                <TouchableOpacity onPress={async () => await handleSetStore()}>
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
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'

const Stores = (props) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                <View>
                    <Image
                        source={{
                            uri: props.imgUrl,
                        }}
                        style={{
                            height: 135,
                            width: 300
                        }}
                    />
                </View>
                <View style={{ padding: 10, width: "90%" }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {props.name} </Text>
                    <Text style={{ color: "#777", paddingTop: 5 }}>
                        {props.address}
                    </Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ color: "#777" }}>Contact No: {props.contact}</Text>
                        <Text style={{ color: "#777", paddingLeft: '20%' }}> 2.5 km</Text>
                    </View>

                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#00CBBC',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 110,
        // justifyContent: 'space-between',
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 20,
        height: 20,
        backgroundColor: '#5F9EA0',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '90%',
        // fontWeight: 'bold',
        fontSize: 15
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#2F4F4F',
        borderWidth: 2,
        borderRadius: 5

    }
});

export default Stores;

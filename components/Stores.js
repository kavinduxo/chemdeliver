import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Stores = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                {/* <View style={styles.square}></View> */}
                <Text style={styles.itemText}>{props.name}</Text>
                <Text style={styles.itemText}>{props.id}</Text>
                <Text style={styles.itemText}>{props.postcode}</Text>
                <Text style={styles.itemText}>{props.contact}</Text>
                
            </View>
            {/* <View style={styles.circular}></View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFEBCD',
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

import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Counter from "react-native-counters";

const MedicineCard = ({medicine, addingMedicine, removingMedicine}) => {
    
    const showStoreDialog = (number, type) => {
        if(type == '+') {
            addingMedicine({
                dir: medicine.dir,
                name: medicine.name,
                qty: number,
                price: medicine.price
            })
        } else {
            removingMedicine({
                dir: medicine.dir,
                name: medicine.name,
                qty: number,
                price: medicine.price
            })
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={styles.itemText}>{medicine.name} frequency: {medicine.dir}</Text>
                </View>
            </View>
            <View style={styles.count}>
                <Counter start={medicine.qty} onChange={showStoreDialog} max={1000}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#00CBBC',
        borderWidth: 2,
        height: 60,
        width: '60%'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#5F9EA0',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '100%'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#2F4F4F',
        borderWidth: 2,
        borderRadius: 5

    },
    count:{
        paddingBottom: '3%'
    }
});

export default MedicineCard;

import React from 'react';
import { View, Text } from 'react-native';

export default function HistoryCardItems(props) {

    return (

        // <View
        //     style={{
        //         flexDirection: "column",
        //         padding: 10,
        //         backgroundColor: '#03fc84',
        //         justifyContent: 'space-around',
        //         borderRadius: 15,
        //         margin: 5
        //     }}
        // >

            <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }} >
                <Text style={{ fontSize: 15, color: '#153E73' }}>Name: {props.ItemName}</Text>
                <Text style={{ fontSize: 15, color: '#153E73' }}>Quantity: {props.Quantity}</Text>
            </View>

        // </View>
    );
}

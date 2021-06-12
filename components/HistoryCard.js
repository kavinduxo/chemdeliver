import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import HistoryCardItem from './HistoryCardItem';

export default function HistoryCard(props) {

    const drugList = () => {
        return props.Drugs.map((drug) => {
            return (
                <HistoryCardItem key={drug.Id} ItemName={drug.name} Quantity={drug.name} />
            );
        });
    };

    return (

        <View
            style={{
                flexDirection: "column",
                padding: 10,
                justifyContent: 'space-around',
                borderRadius: 15,
                margin: 5
            }}
        >

            <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                <Text style={{ fontSize: 18, color: '#66667E' }}>Order {"CPS001"}</Text>
                <Text style={{ fontSize: 18, color: '#66667E' }}>{props.OrderType}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'center' }} >
                <Text style={{ fontSize: 12, color: '#153E73' }}>{props.DateTime}, {props.Vendor}</Text>
            </View>

            <View>{drugList()}</View>

            <View style={{ flexDirection: "row", justifyContent: 'center' }} >
                <Text style={{ fontSize: 18, color: '#20D0C4' }}>Price: {"20$"}</Text>
            </View>

            <Button
                buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C65D5D' }}
                color="#C65D5D"
                title="Reorder"
                onPress={() => Alert.alert('Reorder Complete!')}
            />

        </View>
        
    );
}
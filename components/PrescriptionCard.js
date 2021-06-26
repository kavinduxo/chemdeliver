import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, LogBox } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import { getDoctor } from '../services/PrescriptionService'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

function PrescriptionCard({ navigation, prescription }) {

    const drugList = () => {
        return eval(prescription.item.drugs).map((drug, i) => {
            return (
                <Text key={i} style={{
                    marginBottom: 5,
                    alignContent: 'center',
                    color: "#153E73",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 15,
                }}>Name: {drug.name} - {drug.qty}</Text>
            );
        });
    };

    const setOption = () => {
        navigation.navigate("PrescriptionInformation", { prescription: prescription });
    }

    return (
        <Card>
            <Card.Title style={{ fontSize: 20, textAlign: 'left', color: '#66667E', width: 300 }}>Script ID: {prescription.item.script_id}</Card.Title>
            <Card.Divider />
            <Text style={{
                fontSize: 20,
                marginBottom: 5,
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                {prescription.item.date}, Dr Shane
            </Text>
            <Text style={{
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                textAlign: "center",
            }}>
            </Text>

            <View>{drugList()}</View>

            <View style={{
                flexDirection: "column",
                height: 70,
                padding: 10,
                justifyContent: "space-around",
                borderRadius: 15,
                width: 280
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        marginBottom: 10,
                        color: "#153E73",
                        fontWeight: "bold"
                    }}>
                    </Text>
                    <Icon
                        name='trash-outline'
                        type='ionicon'
                        color='#C65D5D'
                        style={{ marginBottom: 20 }}
                    />
                </View>
            </View>
            <Button
                buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#00CBBC' }}
                title='Select'
                onPress={() => { setOption() }}
            />
        </Card>
    )
}

export default PrescriptionCard;
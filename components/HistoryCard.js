import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import HistoryCardItem from './HistoryCardItem';
import { getDrugs } from '../services/ordersService';
import { Spinner } from 'native-base';

export default function HistoryCard(props) {

    useEffect(() => {
        async function getData() {
            const drugs = await getDrugs(props.PrescriptionId);
            const drugDataArr = [];
            drugDataArr.push(drugs);
            setDrugData(drugDataArr);
        }
        async function getReorderCount() {
            setReorderCount(3);
        }
        getData();
        getReorderCount();
    }, []);

    const [drugData, setDrugData] = useState(null);
    const [reorderCount, setReorderCount] = useState(0);

    const drugList = () => {

        if (!drugData || drugData == undefined) {
            return <Spinner />
        } else {
            const drugs = eval(drugData[0].drugs).map((drug, i) => {
                return (
                    <View key={i.toString()}>
                        <HistoryCardItem
                            ItemName={drug.name}
                            Quantity={drug.qty}
                        />
                    </View>
                )
            });
            return drugs;
        };
    }

    const handleReorder = () => {
        if (reorderCount >= 1) {
            setReorderCount(reorderCount - 1);
            Alert.alert('Reorder Complete!');
        } else {
            Alert.alert('Reorder Failed! \nNumber of reorders over.')
        }

    }

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

            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 10 }} >
                <Text style={{ fontSize: 18, color: '#00CBBC' }}>Order {"CPS001"}</Text>
                <Text style={{ fontSize: 18, color: '#00CBBC' }}>{props.OrderType}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'center', marginBottom: 5 }} >
                <Text style={{ fontSize: 12, color: '#153E73' }}>{props.DateTime}, {props.Vendor}</Text>
            </View>

            <View>{drugList()}</View>

            <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginBottom: 10, marginTop: 10 }} >
                <Text style={{ fontSize: 18, color: '#00CBBC' }}>Price: {"20$"}</Text>
            </View>

            <Button
                buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#00CBBC' }}
                color="#E2EDF2"
                title="Reorder"
                onPress={() => {handleReorder()}}
            />

        </View>
    );
}
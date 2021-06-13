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
            drugDataArr.push(drugs)
            setDrugData(drugDataArr);
        }
        getData();
    }, []);

    const [drugData, setDrugData] = useState(null);

    const drugList = () => {
        console.log(drugData)
        if (!drugData) {
            return <Spinner />
        } else {

            const drugs = eval(drugData[0].drugs).map((drug,index) => {
                
                return (
                    <View>
                        <HistoryCardItem
                            key={index}
                            ItemName={drug.name}
                            Quantity={drug.qty}
                        />
                    </View>
                )
            });
            return drugs;
        };
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
                <Text style={{ fontSize: 18, color: '#66667E' }}>Order {"CPS001"}</Text>
                <Text style={{ fontSize: 18, color: '#66667E' }}>{props.OrderType}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'center', marginBottom: 5 }} >
                <Text style={{ fontSize: 12, color: '#153E73' }}>{props.DateTime}, {props.Vendor}</Text>
            </View>

            <View>{drugList()}</View>

            <View style={{ flexDirection: "row", justifyContent: 'center', marginBottom: 10, marginTop: 10 }} >
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
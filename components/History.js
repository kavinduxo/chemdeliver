import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import HistoryCard from './HistoryCard';
import { getOrders } from '../services/ordersService';
import { Spinner } from 'native-base';

export default function History({ user }) {

    useEffect(() => {
        async function getData() {
            const data = await getOrders();
            const filteredData = [];
            data.forEach(element => {
                if (element.userId == user.medicalId) {
                    filteredData.push(element);
                }
            });
            setOrderData(filteredData);
        }
        getData();
    }, []);

    const [orderData, setOrderData] = useState(null);

    const orders = () => {

        if (!orderData) {
            return <Spinner />
        } else {
            const orders = orderData.map((order) => {
                return (
                    <View style={{ marginBottom: 20 }}>
                        <HistoryCard
                            key={order.orderId}
                            OrderType="Delivery"
                            DateTime={order.orderDate}
                            Vendor={order.storeId}
                            PrescriptionId={order.prescriptionId}
                        />
                    </View>
                )
            });

            return orders;
        }
    };

    return (

        <ScrollView style={{
            flexDirection: "column",
            height: 100,
            padding: 20,
        }}>

            <View>
                {orders()}
            </View>

        </ScrollView >
    );
}
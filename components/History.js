import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import HistoryCard from './HistoryCard';
import { getOrders } from '../services/ordersService';
import { Spinner } from 'native-base';
import NavHeader from './NavHeader';

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
            const orders = orderData.map((order, i) => {
                return (
                    <View style={{ marginBottom: 20}} key={i.toString()}>
                        <HistoryCard
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
        <SafeAreaView style={styles.safeArea}>
            <View style={{height: "90%"}}>
                <NavHeader title={"History"} />
                <ScrollView style={{
                    flexDirection: "column",
                    height: 90,
                    padding: 20,
                }}>
                    <View style={{ height: "90%" }}>
                        {orders()}
                    </View>

                </ScrollView >
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    }
});
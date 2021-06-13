import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import HistoryCard from './HistoryCard';
import { getOrders } from '../services/ordersService';
import { Spinner } from 'native-base';

export default function History({ userId }) {

    useEffect(async () => {
        const data = await getOrders();
        setOrderData(data);
    },[]);

    const [orderData, setOrderData] = useState([]);

    const orders = () => {

        // const data = await getOrders();
        // setOrderData(data);

        if (orderData == []) {
            return <Spinner />
        } else {

            const orders = orderData.map((order) => {
                return (
                    <View style={{ marginBottom: 20 }}>
                        <HistoryCard key={order.orderId}
                            OrderType="Delivery"
                            DateTime={order.orderDate}
                            Vendor={order.storeId}
                            Drugs={[
                                { id: 1, name: "C4", quantity: 1 }
                            ]}
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
        }}
        >

            <View>
               {orderData == [] ? <Spinner/> : orders()}
            </View>




            {/* <HistoryCard key="3"
                OrderType="Delivery"
                DateTime="14:00, 13/06/2021"
                Vendor="Chemist Warehouse"
                Drugs={[
                    { id: 1, name: "A1", quantity: 5 },
                    { id: 2, name: "Q1", quantity: 7 },
                    { id: 3, name: "P1", quantity: 10 }
                ]}
            />

            <HistoryCard key="4"
                OrderType="Delivery"
                DateTime="14:00, 13/06/2021"
                Vendor="Chemist Warehouse"
                Drugs={[
                    { id: 1, name: "A1", quantity: 5 },
                    { id: 2, name: "APS1", quantity: 5 }
                ]}
            />

            <HistoryCard key="5"
                OrderType="Delivery"
                DateTime="14:00, 13/06/2021"
                Vendor="Chemist Warehouse"
                Drugs={[
                    { id: 1, name: "AQ1", quantity: 15 },
                    { id: 2, name: "A1FS", quantity: 55 }
                ]}
            />
            <HistoryCard key="6"
                OrderType="Pick up"
                DateTime="14:00, 13/06/2021"
                Vendor="Chemist Warehouse"
                Drugs={[
                    { id: 1, name: "TY9", quantity: 1 },
                    { id: 2, name: "PO0", quantity: 9 },
                    { id: 3, name: "PO08", quantity: 5 }
                ]}
            />
            <HistoryCard key="7"
                OrderType="Delivery"
                DateTime="14:00, 13/06/2021"
                Vendor="Chemist Warehouse"
                Drugs={[
                    { id: 1, name: "AWS1", quantity: 5 },
                    { id: 2, name: "ASOP", quantity: 7 },
                    { id: 3, name: "SDPO0", quantity: 9 },
                    { id: 4, name: "DPO08", quantity: 55 },
                    { id: 5, name: "RTPO0", quantity: 9 },
                    { id: 6, name: "GPO08", quantity: 5 }
                ]}
            /> */}


        </ScrollView >
    );
}
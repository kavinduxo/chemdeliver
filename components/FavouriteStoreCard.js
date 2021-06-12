import React from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'


function FavouriteStoreCard() {
    return (
        <Card>
            <Card.Title style={{
                color: '#66667E',
                width: 300
            }}
            >Script ID: 1234</Card.Title>
            <Card.Divider />
            <Text style={{
                marginBottom: 5,
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                2021/01/3, Dr.Mason
            </Text>
            <Text style={{
                alignContent: 'center',
                color: "#153E73",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                DOCHEM Pharmacy
            </Text>


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
                        fontWeight: "bold",
                    }}>
                        ID  1234
                    </Text>
                    <Icon
                        name='trash-outline'
                        type='ionicon'
                        color='#C65D5D'
                    />
                </View>
            </View>
            <Button
                buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C65D5D' }}
                title='Pick this..' />
        </Card>
    )
}
export default FavouriteStoreCard;
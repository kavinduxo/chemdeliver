import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button, Alert, TextInput } from 'react-native'
import NavHeader from './NavHeader';
import { Card } from 'react-native-elements'


const showConDialog = () => {
    Alert.alert('Confirmation', 'You have confirmed the order!', [
        { text: "OK", onPress: () => console.log('') },
    ])
};

const TrackOrder = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{height: "90%"}}>
                <NavHeader title={"Track Order"} />
                <Card>
                    <View>
                        <Text style={{
                            color: '#00CBBC',
                            width: '100%',
                            fontSize: 17,
                            fontWeight: 'bold',
                            paddingLeft: '5%',
                            paddingBottom: '5%'
                        }}>Order: #221CSP0013</Text>
                    </View>

                    <Card.Divider />
                    <View style={styles.testArea}>
                        <View>
                            <Text style={{
                                color: '#00CBBC',
                                width: '100%',
                                fontSize: 23,
                                fontWeight: 'bold',
                                paddingLeft: '3%',
                                paddingBottom: '1%'
                            }}>Levothyroxine</Text>
                            <Text style={{
                                color: '#00CBBC',
                                width: '100%',
                                fontSize: 17,
                                paddingLeft: '3%',
                                paddingBottom: '5%'
                            }}>25mg 200 tablets {'\n'}xx</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: '#808080',
                                width: '100%',
                                fontSize: 23,
                                fontWeight: 'bold',
                                paddingBottom: '1%'
                            }}>Estimate Arrival</Text>
                            <Text style={{
                                color: '#00CBBC',
                                width: '100%',
                                fontSize: 30,
                                fontWeight: 'bold',
                                paddingBottom: '1%',
                                textAlign: 'center'
                            }}>11:30 AM</Text>
                        </View>
                    </View>
                    <Card.Divider />
                    <Card.Title style={{
                        color: '#00CBBC',
                        width: '100%',
                        fontSize: 16,
                    }}
                    >Your order is delivering...</Card.Title>
                    <View>
                        <Text style={{
                            paddingTop: '40%', color: '#00CBBC',
                            width: '100%',
                            fontSize: 18,
                            paddingLeft: '5%'

                        }}>Your verification code is : </Text>
                        <View style={{paddingLeft: '30%', paddingBottom: '10%', paddingTop: '2%'}}>
                            <TextInput style={styles.input} placeholder={'Enter Pres. No.'} value={'2471718'} />
                        </View>
                    </View>
                    <Card.Divider />
                    <View style={styles.btnStore}>
                        <Button title="Confirm" color="#00CBBC" onPress={showConDialog} />
                    </View>

                </Card>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    },
    testArea: {
        paddingBottom: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnStore: {
        marginTop: '1%',
        marginBottom: '2%'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF8DC',
        borderRadius: 20,
        borderColor: '#00CBBC',
        borderWidth: 1,
        width: '70%'

    },
});

export default TrackOrder;
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button, Icon, FlatList } from 'react-native-elements'
import { getDoctor, getPatient } from '../services/PrescriptionService'
import { Spinner } from 'native-base';
import NavHeader from './NavHeader';

function PrescriptionInformation({ route, user }) {

    let drugLst = eval(route.params.prescription.item.drugs);

    const [data, setData] = useState('');
    const [userData, setUserData] = useState('');
    const [isLoading, setLoader] = useState(true);

    useEffect(() => {
        async function getData() {
            const data = await getDoctor(route.params.prescription.item.doctor_id);
            const userData = await getPatient(route.params.prescription.item.patient_id);
            setUserData(userData);
            setData(data);
            setLoader(false);
        }
        getData();

    }, []);


    const drugList = () => {
        return drugLst.map((drug) => {
            return (
                <View style={{ width: 350 }}>
                    <Card style={{
                    }}>
                        <View style={{
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                alignContent: 'center',
                                color: "#00CBBC",
                                fontWeight: "bold",
                                textAlign: "left"
                            }}>
                                Name: {drug.name}
                            </Text>

                            <Text style={{
                                marginBottom: 5,
                                alignContent: 'center',
                                color: "#00CBBC",
                                fontWeight: "bold",
                                textAlign: "left"
                            }}>
                                Quantity: {drug.qty}
                            </Text>

                            <Text style={{
                                marginBottom: 5,
                                alignContent: 'center',
                                color: "#00CBBC",
                                fontWeight: "bold",
                                textAlign: "left"
                            }}>
                                Price: $20

                            </Text>
                            <Text style={{
                                marginBottom: 5,
                                alignContent: 'center',
                                color: "#00CBBC",
                                fontWeight: "bold",
                                textAlign: "left"
                            }}>
                                {drug.repeats} remains
                            </Text>
                        </View>
                    </Card>
                </View>
            );
        });
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: "90%" }}>
                <NavHeader title={"View Prescription"} />
                {isLoading ?
                    <Spinner color='#00CBBC' />
                    : (
                        <>
                            <View>

                                <View style={{ alignSelf: 'center', paddingTop: 100 }}>

                                    <View>
                                        <Text style={styles.outerText}>
                                            Doctor Name: {data[0].doctor_firstName}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.outerText}>
                                            Doctor ID: {data[0].doctor_id}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.outerText}>
                                            Date: {route.params.prescription.item.date}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.outerText}>
                                            Medicine :
                                        </Text>
                                    </View>
                                    <View>{drugList()}</View>
                                    <View style={{ alignSelf: 'center', paddingTop: 20 }} />
                                    <View>
                                        <Text style={styles.outerText}>
                                            Patient Name: {userData[0].firstName} {userData[0].lastName}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.outerText}>
                                            Medicare ID: {userData[0].medicare_number}
                                        </Text>
                                    </View>

                                    <Button
                                        buttonStyle={{
                                            width: 280,
                                            borderRadius: 20,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginTop: 10,
                                            backgroundColor: '#00CBBC',
                                            alignSelf: 'center'
                                        }}
                                        title='Place Order'
                                        onPress={() => Alert.alert('Ordered !')}
                                    />
                                </View>
                            </View>
                        </>
                    )}
            </View>
        </SafeAreaView>                     
    )
}

const styles = StyleSheet.create({
    outerText: {
        marginLeft: 20,
        marginBottom: 5,
        alignContent: 'center',
        color: "#00CBBC",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '10%'
    }
});

export default PrescriptionInformation;





